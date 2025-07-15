import os
import requests

OMDB_API_KEY = os.getenv("OMDB_API_KEY")

def search_movies(title):
    if not OMDB_API_KEY:
        raise Exception("OMDB_API_KEY is missing")
    
    url = f"http://www.omdbapi.com/?apikey={OMDB_API_KEY}&i={title}"
    response = requests.get(url)

    if response.status_code != 200:
        return {"error": "Failed to fetch from OMDB"}
    
    return response.json()

def get_movie_details(imdb_id):
    if not OMDB_API_KEY:
        raise Exception("OMDB_API_KEY is missing")

    url = f"http://www.omdbapi.com/?apikey={OMDB_API_KEY}&i={imdb_id}"
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "Failed to fetch from OMDB"}

    return response.json()