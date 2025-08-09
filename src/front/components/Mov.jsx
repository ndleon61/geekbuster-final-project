import "../styles/Mov.css";
import React from "react";
import MovieRow from "./MovieRow";


const apiKey = import.meta.env.VITE_VITE_TMDB_API_KEY;

const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;


export default function Mov() {
  return (
    <div>

      <MovieRow title="Movies" endpoint="/movie/popular" />
    </div>
  );
}
