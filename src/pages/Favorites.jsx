import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Trash2, Calendar, Plus } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      clearFavorites();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Heart className="h-10 w-10 text-red-600" />
                My Favorites
              </h1>
              <p className="text-xl text-gray-600">
                {favorites.length} {favorites.length === 1 ? 'attraction' : 'attractions'} saved
              </p>
            </div>
            {favorites.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12">
            <div className="text-center">
              <Heart className="h-20 w-20 mx-auto text-gray-300 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No Favorites Yet</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start exploring Cape Town and save your favorite attractions to view them here.
              </p>
              <Link
                to="/attractions"
                className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-semibold"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Explore Attractions
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Quick Actions */}
            <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Want to plan your visit?</span>
                </div>
                <Link
                  to="/planner"
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Itinerary
                </Link>
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group relative"
                >
                  {/* Image */}
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <img
                      src={favorite.image}
                      alt={favorite.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => removeFavorite(favorite.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {favorite.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {favorite.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Category:</span>
                        <span className="font-medium text-gray-900 capitalize">
                          {favorite.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium text-gray-900">{favorite.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Price Range:</span>
                        <span className="font-medium text-gray-900 capitalize">
                          {favorite.priceRange}
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        {favorite.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({favorite.reviewCount?.toLocaleString()} reviews)
                      </span>
                    </div>

                    {/* Location */}
                    {favorite.location && (
                      <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{favorite.location}</span>
                      </div>
                    )}

                    {/* Saved Date */}
                    {favorite.savedAt && (
                      <div className="text-xs text-gray-500 border-t border-gray-100 pt-3">
                        Saved on {new Date(favorite.savedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="px-6 pb-6">
                    <Link
                      to="/attractions"
                      className="block w-full text-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl mb-2">📅</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Plan Your Visit</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Create a custom itinerary with your favorite attractions
                  </p>
                  <Link
                    to="/planner"
                    className="text-sm text-gray-900 font-medium hover:underline"
                  >
                    Go to Planner →
                  </Link>
                </div>
                <div>
                  <div className="text-3xl mb-2">🤖</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Get AI Suggestions</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Let our AI assistant help you plan the perfect trip
                  </p>
                  <Link
                    to="/ai-assistant"
                    className="text-sm text-gray-900 font-medium hover:underline"
                  >
                    Ask AI Assistant →
                  </Link>
                </div>
                <div>
                  <div className="text-3xl mb-2">🗺️</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Explore More</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Discover more attractions in Cape Town
                  </p>
                  <Link
                    to="/attractions"
                    className="text-sm text-gray-900 font-medium hover:underline"
                  >
                    View All Attractions →
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
