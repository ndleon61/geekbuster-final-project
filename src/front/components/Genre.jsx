import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Favorites from "../pages/Favorites";
import "../styles/Genre.css"

const Genre = () => {
	const { dispatch, store } = useGlobalReducer();
	const location = useLocation();
	const genre = new URLSearchParams(location.search).get("query");

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMoviesByGenre = async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/movies/genre?query=${genre}`);
				if (!res.ok) throw new Error("Failed to fetch genre movies");
				const data = await res.json();
				dispatch({ type: "set_movies", payload: data.results || [] });
				dispatch({ type: "set_genre", payload: genre });
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

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


		if (genre) fetchMoviesByGenre();
	}, [genre]);

	if (loading) return <p>Loading movies for "{genre}"...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="genre-container">
			<h2>{genre} Movies</h2>
			<div className="movie-grid">
				{store.movies.length === 0 ? (
					<p>No movies found.</p>
				) : (
					store.movies.map((movie) => (
						<div className="movie-card" key={movie.id}>
							<img
								src={
									movie.poster_path
										? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
										: "https://via.placeholder.com/300x450?text=No+Image"
								}
								alt={movie.title}
							/>
							<div className="movie-info">
								<h5>{movie.title}</h5>
								<Link to={`/movie/${movie.id}`} className="btn-view-details">
									View Details
								</Link>
								<button
									className="btn btn-sm btn-outline-warning"
									onClick={() => handleFavoriteToggle(movie)}
								>
									<i className={`fa ${store.favorites.some(f => f.id === movie.id) ? "fa-solid fa-star" : "fa-regular fa-star"}`} />
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Genre;