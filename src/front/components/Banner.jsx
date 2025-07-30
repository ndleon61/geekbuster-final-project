import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Banner.css";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/original";

const Banner = () => {
	const [bannerMovie, setBannerMovie] = useState(null);

	useEffect(() => {
		const fetchBannerMovie = async () => {
			try {
				const response = await axios.get(
					`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
				);
				const movies = response.data.results;
				const randomMovie = movies[Math.floor(Math.random() * movies.length)];
				setBannerMovie(randomMovie);
			} catch (error) {
				console.error("Failed to fetch banner movie:", error);
			}
		};

		fetchBannerMovie();
	}, []);

	if (!bannerMovie) return <div>Loading...</div>;

	return (
		<header
			className="banner"
			style={{
				backgroundImage: `url(${IMG_BASE}${bannerMovie.backdrop_path})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="banner-content">
				<h1>{bannerMovie.title}</h1>
				<p>{bannerMovie.overview}</p>
			</div>
		</header>
	);
};

export default Banner;


