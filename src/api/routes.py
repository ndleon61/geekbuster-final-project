"""
This module handles API endpoints like signup, login, and favorites.
"""
from flask import request, jsonify, Blueprint
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

from api.models import db, User, FavoriteMovie
from api.utils import generate_sitemap, APIException

from api.services.omdb import search_movies, get_movie_details

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


@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    favorites = FavoriteMovie.query.filter_by(user_id=user_id).all()
    return jsonify([fav.serialize() for fav in favorites]), 200


@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    if not data or not data.get("imdb_id") or not data.get("title"):
        return jsonify({"msg": "imdb_id and title are required"}), 400

    user_id = get_jwt_identity()
    new_fav = FavoriteMovie(imdb_id=data["imdb_id"], title=data["title"], user_id=user_id)
    db.session.add(new_fav)
    db.session.commit()

    return jsonify(new_fav.serialize()), 201

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

@api.route('/movies/search', methods = ['GET'])
def movie_search():
    title = request.args.get('title')
    if not title:
        return jsonify({"msg": "Missing 'title' query parem"}), 400
    
    result = search_movies(title)
    return jsonify(result), 200


@api.route('/movies/<string:imdb_id>', methods=['GET'])
def movie_detail(imdb_id):
    result = get_movie_details(imdb_id)

    if "Error" in result:
        return jsonify({"msg": result["Error"]}), 404

    return jsonify(result), 200