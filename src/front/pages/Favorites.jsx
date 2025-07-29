import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import Header from "../components/Header";

const Favorites = () => {
  const { store, dispatch } = useGlobalReducer();
  const favorites = store.favorites;
  const token = store.token;



  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const json = await res.json();
        dispatch({ type: "set_favorites", payload: json.results || [] });
      } catch (err) {
        console.error("Error loading favorites", err);
      }
    };
    if (favorites.length === 0 && token) {
      loadFavorites();
    }
  }, [dispatch, favorites.length, token]);



  return (
    <div className='Favorite-container'>
      <h2>Your Favorites</h2>
      <div className="movie-grid">
        {favorites.length === 0 ? (
          <p>No favorites saved yet.</p>
        ) : (
          favorites.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                }
                alt={movie.title}
              />
              <div className="movie-info">
                <h5>{movie.title}</h5>
                <Link to={`/movie/${movie.id}`} className="btn-view-details">
                  View Details
                </Link>
                <button
                  className="btn btn-sm btn-outline-warning"
                  onClick={() =>
                    dispatch({ type: "toggle_favorite", payload: movie })
                  }
                >
                  <i className="fa fa-solid fa-star" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
};

export default Favorites