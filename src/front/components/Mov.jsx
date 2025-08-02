import "../styles/Mov.css"; 
import React from "react";
import MovieRow from "./MovieRow";

export default function Mov() {
  return (
    <div className="mov-page">
      <MovieRow title="Popular Movies" endpoint="/movie/popular" />
      <MovieRow title="Top Rated" endpoint="/movie/top_rated" />
      <MovieRow title="Now Playing" endpoint="/movie/now_playing" />
      <MovieRow title="Upcoming" endpoint="/movie/upcoming" />
    </div>
  );
}
