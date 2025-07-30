// Mov.jsx (or Movies.jsx)
import React from "react";
import MovieRow from "./MovieRow";


const apiKey = import.meta.env.VITE_TMDB_KEY;
console.log("TMDB KEY:", apiKey); 

const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;


export default function Mov() {
  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieRow title="Popular Movies" fetchUrl={popularMoviesUrl} />
    </div>
  );
}

