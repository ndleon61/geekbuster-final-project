import React, { useState, useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom';



const Favorites = () => {
  const { store, dispatch } = useGlobalReducer();
  const favorites = store.favorites;



  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites`);
        const json = await res.json();
        dispatch({ type: "set_favorites", payload: json.results || [] });
      } catch (error) {
        console.error("Error fetching your favorite movies", error)
      }
    };
    if (favorites.length === 0) loadFavorites()
  }, [dispatch, favorites]);

  return (
    <div className='Favorite-container'><h2>Your Favorites</h2>
    {favorites.map((fav))}
    </div>
  )
};

