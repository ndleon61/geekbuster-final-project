import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Details.css";

const API_KEY = import.meta.env.VITE_VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
				const data = await res.json();
				setMovie(data);
			} catch (err) {
				console.error("Error fetching movie details:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchMovie();
	}, [id]);

	if (loading) return <div className="loading">Loading...</div>;
	if (!movie || movie.success === false) return <div className="error">Movie not found.</div>;

	return (
		<div className="movie-details container">
			<h1>{movie.title}</h1>
			<div className="details-content">
				<img
					src={`${IMAGE_BASE_URL}${movie.poster_path}`}
					alt={movie.title}
					className="movie-poster"
				/>
				<div className="movie-info">
					<p><strong>Genre:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
					<p><strong>Release Date:</strong> {movie.release_date}</p>
					<p><strong>Rating:</strong> {movie.vote_average} / 10</p>
					<p className="description">{movie.overview}</p>
				</div>
			</div>
		</div>
	);
};

export default MovieDetails;
