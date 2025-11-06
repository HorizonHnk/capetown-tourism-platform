import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, Calendar, MessageCircle } from 'lucide-react';
import { FEATURED_ATTRACTIONS } from '../utils/constants';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover the Magic of Cape Town
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your Ultimate Guide to South Africa's Mother City
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ai-assistant"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                AI Travel Assistant
              </Link>
              <Link
                to="/attractions"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Explore Attractions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="ml-4 text-lg font-semibold">AI-Powered Planning</h3>
              </div>
              <p className="text-gray-600">
                Get personalized itineraries and recommendations powered by Google Gemini AI
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="ml-4 text-lg font-semibold">50+ Attractions</h3>
              </div>
              <p className="text-gray-600">
                Discover the best landmarks, beaches, restaurants, and hidden gems
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="ml-4 text-lg font-semibold">Smart Itinerary Builder</h3>
              </div>
              <p className="text-gray-600">
                Create, customize, and save your perfect Cape Town itinerary
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Attractions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Attractions
            </h2>
            <p className="text-xl text-gray-600">
              Must-see destinations in Cape Town
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_ATTRACTIONS.map((attraction) => (
              <div
                key={attraction.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="h-48 bg-gray-200">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {attraction.name}
                    </h3>
                    <span className="text-2xl">
                      {FEATURED_ATTRACTIONS.find(a => a.category === attraction.category) ?
                        ['🏔️', '🏛️', '🛍️', '🏔️', '🏔️', '🍷'][FEATURED_ATTRACTIONS.indexOf(attraction)] :
                        '⭐'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {attraction.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm text-gray-700">
                        {attraction.rating} ({attraction.reviewCount.toLocaleString()})
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {attraction.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/attractions"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Attractions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Visit Cape Town */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Visit Cape Town?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🌄</div>
              <h3 className="text-xl font-semibold mb-2">Stunning Landscapes</h3>
              <p className="text-gray-600">
                From Table Mountain to pristine beaches, Cape Town's natural beauty is unmatched
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🍷</div>
              <h3 className="text-xl font-semibold mb-2">World-Class Wine</h3>
              <p className="text-gray-600">
                Explore renowned winelands and taste award-winning South African wines
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🏛️</div>
              <h3 className="text-xl font-semibold mb-2">Rich History</h3>
              <p className="text-gray-600">
                Discover the city's complex past and visit iconic historical landmarks
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">☀️</div>
              <h3 className="text-xl font-semibold mb-2">Perfect Weather</h3>
              <p className="text-gray-600">
                Enjoy 300+ days of sunshine with mild temperatures year-round
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Plan Your Cape Town Adventure?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Let our AI assistant help you create the perfect itinerary
          </p>
          <Link
            to="/ai-assistant"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Start Planning Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
