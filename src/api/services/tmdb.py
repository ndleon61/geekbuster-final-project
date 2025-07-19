import os
import requests

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE_URL = "https://api.themoviedb.org/3"

def get_popular_movies(page=1):
    if not TMDB_API_KEY:
        raise Exception("TMDB_API_KEY is missing")

    url = f"{TMDB_BASE_URL}/movie/popular?api_key={TMDB_API_KEY}&page={page}"
    response = requests.get(url)

    if response.status_code != 200:
        return {"error": "Failed to fetch from TMDb", "status": response.status_code}
    
    return response.json()

def get_movie_details(movie_id):
    if not TMDB_API_KEY:
        raise Exception("TMDB_API_KEY is missing")

    url = f"{TMDB_BASE_URL}/movie/{movie_id}?api_key={TMDB_API_KEY}"
    response = requests.get(url)

    if response.status_code != 200:
        return {"error": "Failed to fetch from TMDb", "status": response.status_code}
    
    return response.json()

def search_movies_by_title(title):
    if not TMDB_API_KEY:
        raise Exception("TMDB_API_KEY is missing")

    url = f"{TMDB_BASE_URL}/search/movie?api_key={TMDB_API_KEY}&query={title}"
    response = requests.get(url)

    if response.status_code != 200:
        return {"error": "Failed to fetch search results", "status": response.status_code}

    return response.json()