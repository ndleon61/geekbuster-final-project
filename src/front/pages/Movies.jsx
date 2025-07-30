import React from "react";
import MovieRow from "../components/MovieRow";

const apiKey = "cb40b15a9df3a3207e5c05b5e78d8b09"; 

export default function Movies() {
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieRow title="Popular Movies" fetchUrl={popularMoviesUrl} />
    </div>
  );
}
