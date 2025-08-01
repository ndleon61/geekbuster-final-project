import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import "../styles/SearchResults.css";
import useGlobalReducer from '../hooks/useGlobalReducer';

const SearchResults = () => {
	const location = useLocation();
	const query = new URLSearchParams(location.search).get("query");

	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { store, dispatch } = useGlobalReducer();

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

	useEffect(() => {
		const fetchSearchResults = async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/movies/search/title?query=${query}`);
				if (!res.ok) throw new Error("Failed to fetch search results");
				const data = await res.json();
				setResults(data.results || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (query) fetchSearchResults();
	}, [query]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="search-results-container">
			<h2 className="search-heading">Search Results for "{query}"</h2>
			<div className="results-grid">
				{results.length === 0 ? (
					<p className="no-results-text">No results found.</p>
				) : (
					results.map((movie) => {
						const isFavorite = store.favorites.some(
							(fav) => String(fav.id) === String(movie.id)
						);

						return (
							<div className="movie-card-wrapper" key={movie.id}>
								<div className="movie-card">
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
										<Link to={`/movie/${movie.id}`} className="details-button">
											View Details
										</Link>
										<button
											className="btn btn-sm btn-outline-warning"
											onClick={() => handleFavoriteToggle(movie)}
										>
											<i className={`fa ${isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"}`} />
										</button>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default SearchResults;