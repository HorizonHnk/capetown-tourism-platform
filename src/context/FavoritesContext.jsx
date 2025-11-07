import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('capetown_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('capetown_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (attraction) => {
    setFavorites((prev) => {
      if (prev.find((fav) => fav.id === attraction.id)) {
        return prev; // Already in favorites
      }
      return [...prev, { ...attraction, savedAt: new Date().toISOString() }];
    });
  };

  const removeFavorite = (attractionId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== attractionId));
  };

  const toggleFavorite = (attraction) => {
    if (isFavorite(attraction.id)) {
      removeFavorite(attraction.id);
    } else {
      addFavorite(attraction);
    }
  };

  const isFavorite = (attractionId) => {
    return favorites.some((fav) => fav.id === attractionId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
