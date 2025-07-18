"""
This module handles API endpoints like signup, login, and favorites.
"""
from flask import request, jsonify, Blueprint
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

from api.models import db, User, FavoriteMovie
from api.utils import generate_sitemap, APIException
from api.services.tmdb import get_popular_movies, get_movie_details


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

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Email and password are required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "User already exists"}), 400

    hashed_pw = generate_password_hash(data["password"])
    new_user = User(email=data["email"], password=hashed_pw, is_active=True)
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
    if not user or not check_password_hash(user.password, data["password"]):
        return jsonify({"msg": "Invalid credentials"}), 401

    token = create_access_token(identity= str(user.id))
    return jsonify(access_token=token), 200

#Gets favorites by ID
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

#Gets all favorites
@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    favorites = FavoriteMovie.query.filter_by(user_id=user_id).all()
    return jsonify([fav.serialize() for fav in favorites]), 200

#Adds a favorite
@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    if not data or not data.get("imdb_id") or not data.get("title"):
        return jsonify({"msg": "imdb_id and title are required"}), 400

    user_id = get_jwt_identity()
    
    existing_fav = FavoriteMovie.query.filter_by(imdb_id=data["imdb_id"], user_id = user_id).first()
    if existing_fav:
        return jsonify({"msg": "Movie already favorited"}), 409

    new_fav = FavoriteMovie(imdb_id=data["imdb_id"], title=data["title"], user_id=user_id)
    db.session.add(new_fav)
    db.session.commit()

    return jsonify(new_fav.serialize()), 201

#Deletes a favorite
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


@api.route('/movies/popular', methods=['GET'])
def popular_movies():
    page = request.args.get("page", 1)
    try:
        data = get_popular_movies(page)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/movies/<int:movie_id>', methods=['GET'])
def movie_details(movie_id):
    try:
        data = get_movie_details(movie_id)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500