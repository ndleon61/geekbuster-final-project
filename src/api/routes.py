"""
This module handles API endpoints like signup, login, and favorites.
"""
from flask_cors import cross_origin
from flask import request, jsonify, Blueprint
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_current_user
from werkzeug.security import generate_password_hash, check_password_hash

from api.models import db, User, FavoriteMovie
from api.utils import generate_sitemap, APIException
from api.services.tmdb import get_popular_movies, get_movie_details, search_movies_by_title, search_movies_by_genre
from api.services.tmdb import TMDB_GENRES
from sqlalchemy.exc import SQLAlchemyError
import requests
import os


api = Blueprint('api', __name__)
CORS(api)

# Hello route (default)


@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({"message": "Hello from the backend!"}), 200


# Signup route


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password") or not data.get("full_name") or not data.get("security_question") or not data.get("security_answer"):
        return jsonify({"msg": "Email, password, full name, security question, and answer are required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "User already exists"}), 400

    hashed_answer = generate_password_hash(data["security_answer"])
    new_user = User(
        email=data["email"],
        password=data["password"],
        full_name=data["full_name"],
        security_question=data["security_question"],
        security_answer=hashed_answer,
        is_active=True
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created"}), 201

# Login route


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not user.check_password_hash(data["password"]):
        return jsonify({"msg": "Invalid credentials"}), 401

    token = create_access_token(user)
    return jsonify(access_token=token, user=user.serialize()), 200

# Gets favorites by ID


@api.route('/favorites/<int:id>', methods=['GET'])
@jwt_required()
def get_favorite(id):
    user_id = get_jwt_identity()
    favorite = FavoriteMovie.query.get(id)

    if not favorite:
        return jsonify({"msg": "Favorite not found"}), 404

    if favorite.user_id != int(user_id):
        return jsonify({"msg": "Unauthorized"}), 403

    return jsonify(favorite.serialize()), 200

# Gets all favorites


@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    favorites = get_current_user().favorites
    return jsonify([fav.serialize() for fav in favorites]), 200

# Adds a favorite


@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    if not data or not data.get("tmdb_id") or not data.get("title"):
        return jsonify({"msg": "tmdb_id and title are required"}), 400

    user_id = get_jwt_identity()

    existing_fav = FavoriteMovie.query.filter_by(
        tmdb_id=data["tmdb_id"], user_id=user_id).first()
    if existing_fav:
        return jsonify({"msg": "Movie already favorited"}), 409

    new_fav = FavoriteMovie(
        tmdb_id=data["tmdb_id"], title=data["title"], user_id=user_id)
    db.session.add(new_fav)
    db.session.commit()

    return jsonify(new_fav.serialize()), 201

# Deletes a favorite


@api.route('/favorites/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(id):
    user_id = get_jwt_identity()
    favorite = FavoriteMovie.query.get(id)

    if not favorite:
        return jsonify({"msg": "Favorite not found"}), 404

    if favorite.user_id != int(user_id):
        return jsonify({"msg": "Unauthorized"}), 403

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"msg": "Favorite deleted"}), 200

# Gets all popular movies. This will be used for the homepage


@api.route('/movies/popular', methods=['GET'])
def popular_movies():
    page = request.args.get("page", 1)
    try:
        data = get_popular_movies(page)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Gets movie by ID


@api.route('/movies/<int:movie_id>', methods=['GET'])
def movie_details(movie_id):
    try:
        data = get_movie_details(movie_id)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Gets movie by title


@api.route('/movies/search/title', methods=['GET'])
def search_movies():
    title = request.args.get("query")
    if not title:
        return jsonify({"error": "Query parameter 'query' is required"}), 400

    try:
        data = search_movies_by_title(title)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Gets movie by genre
@api.route('/movies/genre', methods=['GET'])
def get_movies_by_genre_name():
    genre_name = request.args.get("query")

    if not genre_name:
        return jsonify({"error": "Query parameter 'query' is required"}), 400

    genre_id = TMDB_GENRES.get(genre_name.title())
    if not genre_id:
        return jsonify({"error": f"Genre '{genre_name}' not recognized"}), 400

    try:
        data = search_movies_by_genre(genre_id)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Reset Password


@api.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get("email")
    answer = data.get("security_answer")
    new_password = data.get("new_password")

    if not email:
        return jsonify({"msg": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    if not answer and not new_password:
        return jsonify({"security_question": user.security_question}), 200

    if not answer or not new_password:
        return jsonify({"msg": "Security answer and new password are required"}), 400

    if not check_password_hash(user.security_answer, answer):
        return jsonify({"msg": "Incorrect security answer"}), 403

    try:
        user.password = generate_password_hash(new_password)
        db.session.commit()
        return jsonify({"msg": "Password updated successfully"}), 200
    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({"msg": "Database error occurred"}), 500


@api.route('/tmdb/<path:route>')
def tmbd(route):
    api_key = os.getenv("VITE_TMDB_API_KEY")
    res = requests.request(
        url=f"https://api.themoviedb.org/3/{route}",
        method=request.method,
        params={
            **request.args,
            "api_key": api_key
        },
        json=request.get_json(silent=True, force=True),
        headers={"Content-Type",
                 request.headers.get("Content-Type", "text/plain")}
    )
    return jsonify(res.json())
