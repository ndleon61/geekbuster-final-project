import React, { useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom';

/*function addFavorite(movieId) {
  // Retrieve favorites from storage, or default to an empty array
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  // Check if this movie is already in favorites (avoid duplicates)
  if (favorites.find(m => m.id === movieId)) {
    alert("This movie is already in your favorites!");
    return;
  }
  // Find the movie details from the last search results (or fetch by ID if needed)
  const movie = lastSearchResults.find(m => m.id === movieId);
  if (!movie) return;
  // Create a simplified movie object to store
  const faveData = {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path
  };
  favorites.push(faveData);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  alert(`Added "${movie.title}" to favorites!`);
} */

const Favorites = () => {
    const { store, dispatch } = useGlobalReducer();
    const favs = store.favs;
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                //I will hook up the .env file to pass a variable so that a$$h()les don't see our back end stuff
                const res = await fetch("https://sturdy-sniffle-6v9vqq46jxcp6q-3001.app.github.dev/movies/popular");
                const json = await res.json();
                dispatch({ type: "set_favs", payload: json.results || [] });
            } catch (error) {
                console.error("Error fetching your favorite movies", error)
            }
        };
        if (favs.length === 0) loadFavorites()
    }, [dispatch, favs]);
    return (
        <div>Favorites</div>
    )
};
export default Favorites;

/*
*********************----------------This is from the card item, displays the actual thingies 
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CardItem = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();

  const isFavorite = store.favorites.some(
    (fav) => String(fav.uid) === String(item.uid) && fav.type === type
  );

  const handleFavoriteToggle = () => {
    dispatch({
      type: "toggle_favorite",
      payload: { uid: item.uid, type },
    });
  };

  const placeholderImg = "https://via.placeholder.com/400x200/000000/FFFFFF?text=Image+Unavailable";
  const imageUrl = `https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`;

  const renderDetails = () => {
    const textStyle = { color: "white", fontSize: "0.9rem" };

    if (type === "people") {
      return (
        <div style={textStyle}>
          <div>Gender: {item.gender || "N/A"}</div>
          <div>Eye Color: {item.eye_color || "N/A"}</div>
          <div>Hair Color: {item.hair_color || "N/A"}</div>
        </div>
      );
    } else if (type === "planets") {
      return (
        <div style={textStyle}>
          <div>Climate: {item.climate || "N/A"}</div>
          <div>Terrain: {item.terrain || "N/A"}</div>
          <div>Population: {item.population || "N/A"}</div>
        </div>
      );
    } else if (type === "vehicles") {
      return (
        <div style={textStyle}>
          <div>Model: {item.model || "N/A"}</div>
          <div>Manufacturer: {item.manufacturer || "N/A"}</div>
          <div>Class: {item.vehicle_class || "N/A"}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="card me-3 bg-dark text-white shadow"
      style={{ minWidth: "18rem", maxWidth: "18rem", borderRadius: "10px" }}
    >
      <img
        src={imageUrl}
        className="card-img-top rounded-top"
        alt={item.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholderImg;
        }}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title text-truncate" title={item.name}>
          {item.name}
        </h5>
        {renderDetails()}
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <Link to={`/${type}/${item.uid}`} className="btn btn-outline-light btn-sm">
          Learn More
        </Link>
        <button
          className="btn btn-sm btn-outline-warning"
          onClick={handleFavoriteToggle}
        >
          <i className={`fa ${isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"}`} />
        </button>
      </div>
    </div>
  );
};

*************-------------Home.jsx from the star wars project----------------------
import { CardItem } from "../components/CardItem";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const fetchDetails = async (endpoint, type) => {
    const res = await fetch(`https://www.swapi.tech/api/${endpoint}`);
    const data = await res.json();

    const detailedItems = await Promise.all(
      data.results.map(async (item) => {
        const resDetail = await fetch(item.url);
        const detailData = await resDetail.json();
        return { ...detailData.result.properties, uid: item.uid };
      })
    );

    dispatch({ type, payload: detailedItems });
  };

  useEffect(() => {
    if (store.people.length === 0) fetchDetails("people", "set_people");
    if (store.planets.length === 0) fetchDetails("planets", "set_planets");
    if (store.vehicles.length === 0) fetchDetails("vehicles", "set_vehicles");
  }, []);

  const renderSection = (title, data, type) => (
    <div className="mb-5">
      <h2 className="text-white">{title}</h2>
      <div className="scroll-wrapper d-flex flex-nowrap overflow-auto gap-3">
        {data.map((item) => (
          <CardItem key={`${item.uid}-${type}`} item={item} type={type} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      {renderSection("Characters", store.people, "people")}
      {renderSection("Planets", store.planets, "planets")}
      {renderSection("Vehicles", store.vehicles, "vehicles")}
    </div>
  );
};
*/