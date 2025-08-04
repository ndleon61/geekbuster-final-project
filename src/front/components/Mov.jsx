import "../styles/Mov.css";
import React from "react";
import MovieRow from "./MovieRow";


const apiKey = import.meta.env.VITE_TMDB_KEY;

const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;


export default function Mov() {
  return (
    <div>

      <MovieRow title="Movies" fetchUrl={popularMoviesUrl} />
    </div>
  );
}
