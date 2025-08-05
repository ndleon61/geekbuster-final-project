import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/MovieRow.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const MovieRow = ({ title, endpoint }) => {
  const [movies, setMovies] = useState([]);
  const { dispatch, store } = useGlobalReducer();


  const handleFavoriteToggle = (movie) => {
    dispatch({
      type: "toggle_favorite",
      payload: {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      },
    });
  };

 useEffect(() => {
  if (!endpoint) return;

  const fetchMovies = async () => {
    try {
      const fetchUrl = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`;
      const res = await axios.get(fetchUrl);
      setMovies(res.data.results);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  fetchMovies();
}, [endpoint]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => {
            const isFavorite = store.favorites.some(
              (fav) => String(fav.id) === String(movie.id)
            );

            return <div key={movie.id} className="movie-card">
              <img
                className="row-poster"
                src={`${IMG_BASE}${movie.poster_path}`}
                alt={movie.title || movie.name}
              />
              <h3 className="movie-title">{movie.title || movie.name}</h3>
              <Link to={`/movie/${movie.id}`} className="details-button">
                View Details
              </Link>
              <button
                className="btn btn-sm btn-outline-warning"
                onClick={() => handleFavoriteToggle(movie)}
              >
                <i className={`fa ${isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"}`} />
              </button>
            </div>
          })}
      </div>
    </div>
  );
};

export default MovieRow;