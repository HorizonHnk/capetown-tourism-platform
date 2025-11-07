import { useState } from 'react';
import { Search, Filter, MapPin, Star, Clock, DollarSign, X, Map as MapIcon, List } from 'lucide-react';
import { FEATURED_ATTRACTIONS, ATTRACTION_CATEGORIES, PRICE_RANGES } from '../utils/constants';
import { useFavorites } from '../context/FavoritesContext';
import { Heart } from 'lucide-react';
import LeafletMap from '../components/map/LeafletMap';

const Attractions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  // Filter attractions based on search and filters
  const filteredAttractions = FEATURED_ATTRACTIONS.filter((attraction) => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attraction.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;

    const matchesPrice = selectedPriceRange === 'all' || attraction.priceRange === selectedPriceRange;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
  };

  const openDetailsModal = (attraction) => {
    setSelectedAttraction(attraction);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedAttraction(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Cape Town Attractions</h1>
          <p className="text-xl text-gray-600">
            Discover {FEATURED_ATTRACTIONS.length}+ amazing places to visit in Cape Town
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search attractions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* View Toggle */}
            <div className="inline-flex rounded-lg border border-gray-300 p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapIcon className="h-4 w-4 mr-2" />
                Map
              </button>
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className="hidden sm:flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {ATTRACTION_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                {PRICE_RANGES.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.symbol} {range.label}
                  </option>
                ))}
              </select>

              {(searchTerm || selectedCategory !== 'all' || selectedPriceRange !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  <X className="h-5 w-5 mr-1" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="sm:hidden mt-4 space-y-4 pb-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {ATTRACTION_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                {PRICE_RANGES.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.symbol} {range.label}
                  </option>
                ))}
              </select>

              {(searchTerm || selectedCategory !== 'all' || selectedPriceRange !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <X className="h-5 w-5 mr-1" />
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAttractions.length} of {FEATURED_ATTRACTIONS.length} attractions
          </p>
        </div>

        {filteredAttractions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No attractions found</p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'map' ? (
          <div className="h-[600px] rounded-lg overflow-hidden border border-gray-200">
            <LeafletMap attractions={filteredAttractions} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions.map((attraction) => (
              <div
                key={attraction.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow relative group"
              >
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                    {ATTRACTION_CATEGORIES.find(c => c.id === attraction.category)?.icon}
                  </div>
                  <button
                    onClick={() => toggleFavorite(attraction)}
                    className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                    aria-label={isFavorite(attraction.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite(attraction.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {attraction.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {attraction.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {attraction.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {attraction.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {PRICE_RANGES.find(p => p.id === attraction.priceRange)?.label}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-semibold text-gray-900">
                        {attraction.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({attraction.reviewCount.toLocaleString()})
                      </span>
                    </div>
                    <button
                      onClick={() => openDetailsModal(attraction)}
                      className="text-gray-900 font-semibold text-sm hover:underline"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedAttraction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedAttraction.name}</h2>
              <button
                onClick={closeDetailsModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Image */}
              <div className="mb-6">
                <img
                  src={selectedAttraction.image}
                  alt={selectedAttraction.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-yellow-500 mb-2">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-2 font-bold text-lg text-gray-900">
                      {selectedAttraction.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {selectedAttraction.reviewCount.toLocaleString()} reviews
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-gray-700 mb-2">
                    <Clock className="h-5 w-5" />
                    <span className="ml-2 font-bold text-lg text-gray-900">
                      {selectedAttraction.duration}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Duration</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-gray-700 mb-2">
                    <DollarSign className="h-5 w-5" />
                    <span className="ml-2 font-bold text-lg text-gray-900">
                      {PRICE_RANGES.find(p => p.id === selectedAttraction.priceRange)?.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Price Range</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-gray-700 mb-2">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{selectedAttraction.location}</p>
                  <p className="text-xs text-gray-600">Location</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{selectedAttraction.description}</p>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Category</h3>
                <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                  {ATTRACTION_CATEGORIES.find(c => c.id === selectedAttraction.category)?.icon}{' '}
                  {ATTRACTION_CATEGORIES.find(c => c.id === selectedAttraction.category)?.name}
                </span>
              </div>

              {/* Coordinates */}
              {selectedAttraction.coordinates && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Location Coordinates</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      Latitude: <span className="font-mono font-semibold text-gray-900">{selectedAttraction.coordinates.lat}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Longitude: <span className="font-mono font-semibold text-gray-900">{selectedAttraction.coordinates.lng}</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => toggleFavorite(selectedAttraction)}
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isFavorite(selectedAttraction.id)
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite(selectedAttraction.id) ? 'fill-current' : ''}`} />
                  {isFavorite(selectedAttraction.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <button
                  onClick={closeDetailsModal}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attractions;
