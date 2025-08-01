import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/MovieRow.css";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!fetchUrl) return;

    axios
      .get(fetchUrl)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error("Error fetching movies:", err));
  }, [fetchUrl]);

  return (
    <div className="row">
  <h2>{title}</h2>
  <div className="row-posters">
    {movies
      .filter((movie) => movie.poster_path)
      .map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            className="row-poster"
            src={`${IMG_BASE}${movie.poster_path}`}
            alt={movie.title || movie.name}
          />
          <h3 className="movie-title">{movie.title || movie.name}</h3>
          <Link to={`/movie/${movie.id}`} className="details-button">
            View Details
          </Link>
        </div>
      ))}
  </div>
</div>
  );
};

export default MovieRow;
