import React from "react";
import MovieRow from "../components/MovieRow";

const apiKey = import.meta.env.VITE_VITE_TMDB_API_KEY;

export default function Movies() {
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieRow title="Popular Movies" endpoint="/movie/popular" />
    </div>
  );
}
