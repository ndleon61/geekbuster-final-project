import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Banner.css";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBannerMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Failed to fetch banner movies:", error);
      }
    };

    fetchBannerMovies();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  if (!movies.length) return <div>Loading...</div>;

  const bannerMovie = movies[currentIndex];

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${IMG_BASE}${bannerMovie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <button className="banner-next-button" onClick={handleNext}>
        Next ➤
      </button>
    </header>
  );
};

export default Banner;
