export const initialStore = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
    favorites: [],
    watchlist: [],
    movies: [],
    selectedGenre: null,
    image: {
      image_1: "https://i.pinimg.com/736x/ec/74/7a/ec747a688a5d6232663caaf114bad1c3.jpg",
      image_2: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
      image_3: "https://wallpapers.com/images/featured/netflix-profile-pictures-w3lqr61qe57e9yt8.jpg",
      image_4: "https://i.pinimg.com/564x/a4/c6/5f/a4c65f709d4c0cb1b4329c12beb9cd78.jpg",
      image_5: "https://i.pinimg.com/564x/b2/a0/29/b2a029a6c2757e9d3a09265e3d07d49d.jpg"
    }

  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...store,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...store,
        user: null,
        token: null,
      };

    case "set_movies":
      return { ...store, movies: action.payload };

    case "set_genre":
      return { ...store, selectedGenre: action.payload };

    case "toggle_favorite": {
      const { id } = action.payload;
      const exists = store.favorites.some((fav) => fav.id === id);

      const updatedFavorites = exists
        ? store.favorites.filter((fav) => !(fav.id === id))
        : [...store.favorites, { id }];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return {
        ...store,
        favorites: updatedFavorites,
      };
    }

    default:
      throw new Error("Unknown action type");
  }
}
