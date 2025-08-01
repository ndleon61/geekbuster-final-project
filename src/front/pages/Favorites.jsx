import React from 'react';
import {useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

const Favorites = () => {
  const {store, dispatch} = useGlobalReducer();
  const favorites = store.favorites;
  const token = store.token;
  

  
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const res = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const json = await res.json();
        dispatch({type: "set_favorites", payload: json.results || []});
      } catch (err) {
        console.error("Error loading favorites", err);
      } 
    };
    if (favorites.length === 0 && token) {
      loadFavorites();
    } 
  }, [dispatch, favorites.length, token]);


  
  return (
    <div className='Favorite-container'>
      <h2>Your Favorites</h2>
      {favorites.map((fav) => {
        <ul>
          <li key={fav.id}>
          <Link to={`/details/${fav.imdb_id || fav.id}`}>{fav.title}</Link>
        </li>
        </ul>
      })}






    </div>
  )
};

export default Favorites;