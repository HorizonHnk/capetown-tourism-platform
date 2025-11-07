import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, Calendar, MessageCircle, Heart, Play, X, Loader2, Users, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { FEATURED_ATTRACTIONS } from '../utils/constants';
import { useFavorites } from '../context/FavoritesContext';
import WeatherWidget from '../components/widgets/WeatherWidget';
import HeroCarousel from '../components/home/HeroCarousel';
import { generateChatResponse } from '../services/geminiAI';

const Home = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  // State for interactive features
  const [showQuickItinerary, setShowQuickItinerary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState('');
  const [itineraryDays, setItineraryDays] = useState(3);
  const [itineraryBudget, setItineraryBudget] = useState('moderate');
  const [itineraryInterests, setItineraryInterests] = useState([]);
  const [attractionCount, setAttractionCount] = useState(0);
  const [expandedWhyVisit, setExpandedWhyVisit] = useState(null);

  // Animate attraction counter
  useEffect(() => {
    const target = FEATURED_ATTRACTIONS.length;
    const duration = 2000;
    const increment = target / (duration / 50);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAttractionCount(target);
        clearInterval(timer);
      } else {
        setAttractionCount(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const interestOptions = [
    { id: 'nature', label: 'Nature & Hiking', icon: '🏔️' },
    { id: 'beaches', label: 'Beaches', icon: '🏖️' },
    { id: 'wine', label: 'Wine Tasting', icon: '🍷' },
    { id: 'history', label: 'History & Culture', icon: '🏛️' },
    { id: 'adventure', label: 'Adventure', icon: '🎢' },
    { id: 'food', label: 'Food & Dining', icon: '🍽️' }
  ];

  const toggleInterest = (interest) => {
    if (itineraryInterests.includes(interest)) {
      setItineraryInterests(itineraryInterests.filter(i => i !== interest));
    } else {
      setItineraryInterests([...itineraryInterests, interest]);
    }
  };

  const generateQuickItinerary = async () => {
    setIsGenerating(true);
    setGeneratedItinerary('');

    try {
      const prompt = `Create a ${itineraryDays}-day Cape Town itinerary for a ${itineraryBudget} budget${itineraryInterests.length > 0 ? ` focusing on: ${itineraryInterests.join(', ')}` : ''}.

Format each day clearly with:
- Day number as heading
- Morning, afternoon, and evening activities
- Brief descriptions
- Estimated costs

Keep it concise and practical.`;

      const response = await generateChatResponse(prompt);
      setGeneratedItinerary(response);
    } catch (error) {
      setGeneratedItinerary('Unable to generate itinerary. Please try the full AI Assistant for better results.');
    } finally {
      setIsGenerating(false);
    }
  };

  const whyVisitDetails = {
    landscapes: {
      title: 'Stunning Landscapes',
      icon: '🌄',
      description: 'From Table Mountain to pristine beaches, Cape Town\'s natural beauty is unmatched',
      details: [
        'Table Mountain - UNESCO World Heritage Site',
        'Twelve Apostles mountain range',
        'Cape Point and Cape of Good Hope',
        'Pristine white sand beaches',
        'Dramatic coastal drives',
        'Diverse flora and fauna'
      ]
    },
    wine: {
      title: 'World-Class Wine',
      icon: '🍷',
      description: 'Explore renowned winelands and taste award-winning South African wines',
      details: [
        'Stellenbosch - Historic wine region',
        'Franschhoek - Gourmet capital',
        'Constantia - Oldest wine region',
        'Wine tasting experiences',
        'Michelin-star restaurants',
        'Beautiful vineyard estates'
      ]
    },
    history: {
      title: 'Rich History',
      icon: '🏛️',
      description: 'Discover the city\'s complex past and visit iconic historical landmarks',
      details: [
        'Robben Island - Nelson Mandela prison',
        'District Six Museum',
        'Castle of Good Hope (1666)',
        'Bo-Kaap colorful heritage area',
        'Company\'s Garden',
        'Apartheid Museum experiences'
      ]
    },
    weather: {
      title: 'Perfect Weather',
      icon: '☀️',
      description: 'Enjoy 300+ days of sunshine with mild temperatures year-round',
      details: [
        'Average 26°C (79°F) in summer',
        'Mild winters 18°C (64°F)',
        '300+ days of sunshine annually',
        'Mediterranean climate',
        'Best visited Sep-April',
        'Outdoor activities year-round'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Weather Widget & Quick Info */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <WeatherWidget />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">Smart Planning</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Create, customize, and save your perfect Cape Town itinerary
              </p>
              <Link
                to="/planner"
                className="text-gray-900 font-semibold text-sm hover:underline flex items-center"
              >
                Start Planning <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI-Powered Planning Card - Interactive */}
            <button
              onClick={() => setShowQuickItinerary(true)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all text-left group"
            >
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-3 rounded-full group-hover:scale-110 transition-transform">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">AI-Powered Planning</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Get personalized itineraries and recommendations powered by Google Gemini AI
              </p>
              <div className="flex items-center text-purple-600 font-semibold text-sm">
                Generate Itinerary <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* 50+ Attractions Card - Interactive */}
            <button
              onClick={() => navigate('/attractions')}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all text-left group"
            >
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-full group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">
                  <span className="text-3xl font-bold text-green-600">{attractionCount}+</span> Attractions
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Discover the best landmarks, beaches, restaurants, and hidden gems
              </p>
              <div className="flex items-center text-green-600 font-semibold text-sm">
                Explore Now <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Smart Itinerary Builder Card - Interactive */}
            <button
              onClick={() => navigate('/planner')}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all text-left group"
            >
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-full group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">Smart Itinerary Builder</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Create, customize, and save your perfect Cape Town itinerary
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-sm">
                Start Planning <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Attractions */}
      <section className="py-16 bg-white">
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
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow relative group"
              >
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(attraction);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
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
                <Link to="/attractions" className="block p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {attraction.name}
                    </h3>
                    <span className="text-2xl">
                      {['🏔️', '🏛️', '🛍️', '🏔️', '🏔️', '🍷'][FEATURED_ATTRACTIONS.indexOf(attraction)]}
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
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/attractions"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              View All Attractions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Visit Cape Town - Interactive */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Visit Cape Town?
            </h2>
            <p className="text-gray-600">Click on each card to learn more</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Landscapes Card */}
            <button
              onClick={() => setExpandedWhyVisit(expandedWhyVisit === 'landscapes' ? null : 'landscapes')}
              className="text-center bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{whyVisitDetails.landscapes.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{whyVisitDetails.landscapes.title}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {whyVisitDetails.landscapes.description}
              </p>
              <div className="flex items-center justify-center text-gray-500 text-xs">
                {expandedWhyVisit === 'landscapes' ? (
                  <>Show Less <ChevronUp className="h-4 w-4 ml-1" /></>
                ) : (
                  <>Learn More <ChevronDown className="h-4 w-4 ml-1" /></>
                )}
              </div>
              {expandedWhyVisit === 'landscapes' && (
                <div className="mt-4 pt-4 border-t border-gray-200 text-left">
                  <ul className="space-y-2 text-sm text-gray-700">
                    {whyVisitDetails.landscapes.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>

            {/* Wine Card */}
            <button
              onClick={() => setExpandedWhyVisit(expandedWhyVisit === 'wine' ? null : 'wine')}
              className="text-center bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{whyVisitDetails.wine.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{whyVisitDetails.wine.title}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {whyVisitDetails.wine.description}
              </p>
              <div className="flex items-center justify-center text-gray-500 text-xs">
                {expandedWhyVisit === 'wine' ? (
                  <>Show Less <ChevronUp className="h-4 w-4 ml-1" /></>
                ) : (
                  <>Learn More <ChevronDown className="h-4 w-4 ml-1" /></>
                )}
              </div>
              {expandedWhyVisit === 'wine' && (
                <div className="mt-4 pt-4 border-t border-gray-200 text-left">
                  <ul className="space-y-2 text-sm text-gray-700">
                    {whyVisitDetails.wine.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>

            {/* History Card */}
            <button
              onClick={() => setExpandedWhyVisit(expandedWhyVisit === 'history' ? null : 'history')}
              className="text-center bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{whyVisitDetails.history.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{whyVisitDetails.history.title}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {whyVisitDetails.history.description}
              </p>
              <div className="flex items-center justify-center text-gray-500 text-xs">
                {expandedWhyVisit === 'history' ? (
                  <>Show Less <ChevronUp className="h-4 w-4 ml-1" /></>
                ) : (
                  <>Learn More <ChevronDown className="h-4 w-4 ml-1" /></>
                )}
              </div>
              {expandedWhyVisit === 'history' && (
                <div className="mt-4 pt-4 border-t border-gray-200 text-left">
                  <ul className="space-y-2 text-sm text-gray-700">
                    {whyVisitDetails.history.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>

            {/* Weather Card */}
            <button
              onClick={() => setExpandedWhyVisit(expandedWhyVisit === 'weather' ? null : 'weather')}
              className="text-center bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{whyVisitDetails.weather.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{whyVisitDetails.weather.title}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {whyVisitDetails.weather.description}
              </p>
              <div className="flex items-center justify-center text-gray-500 text-xs">
                {expandedWhyVisit === 'weather' ? (
                  <>Show Less <ChevronUp className="h-4 w-4 ml-1" /></>
                ) : (
                  <>Learn More <ChevronDown className="h-4 w-4 ml-1" /></>
                )}
              </div>
              {expandedWhyVisit === 'weather' && (
                <div className="mt-4 pt-4 border-t border-gray-200 text-left">
                  <ul className="space-y-2 text-sm text-gray-700">
                    {whyVisitDetails.weather.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-yellow-600 mr-2">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Video Tour Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Play className="h-8 w-8 text-gray-700 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Discover Cape Town
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch this comprehensive video guide featuring Cape Town's iconic sights, pristine beaches,
              world-class wine estates, and breathtaking natural wonders
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Video Container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100">
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/HpZUCydp-Yc"
                  title="Cape Town: A Local's guide to Iconic Sights & Hidden Gems"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Video Description */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Featured in this video:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🏔️</span>
                  <div>
                    <p className="font-semibold text-gray-900">Table Mountain</p>
                    <p className="text-sm text-gray-600">UNESCO World Heritage Site</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🛍️</span>
                  <div>
                    <p className="font-semibold text-gray-900">V&A Waterfront</p>
                    <p className="text-sm text-gray-600">Shopping & Entertainment Hub</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🏖️</span>
                  <div>
                    <p className="font-semibold text-gray-900">Atlantic Seaboard</p>
                    <p className="text-sm text-gray-600">Camps Bay, Clifton Beaches</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🐧</span>
                  <div>
                    <p className="font-semibold text-gray-900">Boulders Beach</p>
                    <p className="text-sm text-gray-600">African Penguin Colony</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🍷</span>
                  <div>
                    <p className="font-semibold text-gray-900">Cape Winelands</p>
                    <p className="text-sm text-gray-600">Constantia & Beyond</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🌺</span>
                  <div>
                    <p className="font-semibold text-gray-900">Kirstenbosch</p>
                    <p className="text-sm text-gray-600">Botanical Gardens</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🚗</span>
                  <div>
                    <p className="font-semibold text-gray-900">Chapman's Peak</p>
                    <p className="text-sm text-gray-600">Scenic Coastal Drive</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🐋</span>
                  <div>
                    <p className="font-semibold text-gray-900">Hermanus</p>
                    <p className="text-sm text-gray-600">Whale Watching Paradise</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🏰</span>
                  <div>
                    <p className="font-semibold text-gray-900">Wine Estates</p>
                    <p className="text-sm text-gray-600">Delaire Graff, Babylonstoren</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Travelers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Cape Town completely exceeded my expectations! The AI assistant helped me plan the perfect itinerary. Table Mountain at sunset was absolutely breathtaking. I can't wait to come back!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.pravatar.cc/150?img=5"
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">London, UK</p>
                  <p className="text-xs text-gray-500 mt-1">Solo Adventure • March 2024</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "The budget calculator was a lifesaver! We managed to have an amazing family vacation while staying within our budget. The kids loved Boulders Beach and the penguins!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Michael Chen"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">Michael Chen</p>
                  <p className="text-sm text-gray-600">Singapore</p>
                  <p className="text-xs text-gray-500 mt-1">Family Trip • January 2024</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "The Google Maps integration made navigating so easy! We discovered hidden gems we wouldn't have found otherwise. The Cape Winelands tour was unforgettable!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.pravatar.cc/150?img=9"
                  alt="Emma Rodriguez"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">Emma Rodriguez</p>
                  <p className="text-sm text-gray-600">Barcelona, Spain</p>
                  <p className="text-xs text-gray-500 mt-1">Couples Getaway • February 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Ready to Plan Your Cape Town Adventure?
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Let our AI assistant help you create the perfect itinerary
          </p>
          <Link
            to="/ai-assistant"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Start Planning Now
          </Link>
        </div>
      </section>

      {/* Quick Itinerary Generator Modal */}
      {showQuickItinerary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-3 rounded-full">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">AI Itinerary Generator</h2>
                  <p className="text-sm text-gray-600">Powered by Google Gemini AI</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowQuickItinerary(false);
                  setGeneratedItinerary('');
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              {!generatedItinerary ? (
                <div className="space-y-6">
                  {/* Trip Duration */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      How many days?
                    </label>
                    <div className="grid grid-cols-5 gap-3">
                      {[1, 2, 3, 5, 7].map((days) => (
                        <button
                          key={days}
                          onClick={() => setItineraryDays(days)}
                          className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                            itineraryDays === days
                              ? 'border-purple-600 bg-purple-50 text-purple-600'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {days} {days === 1 ? 'Day' : 'Days'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Budget Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['budget', 'moderate', 'luxury'].map((budget) => (
                        <button
                          key={budget}
                          onClick={() => setItineraryBudget(budget)}
                          className={`px-4 py-3 rounded-lg border-2 font-semibold capitalize transition-all ${
                            itineraryBudget === budget
                              ? 'border-purple-600 bg-purple-50 text-purple-600'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Your Interests (Optional)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interestOptions.map((interest) => (
                        <button
                          key={interest.id}
                          onClick={() => toggleInterest(interest.id)}
                          className={`px-4 py-3 rounded-lg border-2 font-medium transition-all flex items-center gap-2 ${
                            itineraryInterests.includes(interest.id)
                              ? 'border-purple-600 bg-purple-50 text-purple-600'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className="text-xl">{interest.icon}</span>
                          <span className="text-sm">{interest.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateQuickItinerary}
                    disabled={isGenerating}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Generating Your Perfect Itinerary...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        Generate Itinerary
                      </>
                    )}
                  </button>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">💡 Pro Tip</p>
                        <p>Select your interests to get a more personalized itinerary tailored to your preferences!</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Generated Itinerary */}
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      <h3 className="font-semibold text-lg text-gray-900">
                        Your {itineraryDays}-Day Cape Town Itinerary
                      </h3>
                    </div>
                    <div
                      className="prose prose-sm max-w-none text-gray-800 whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: generatedItinerary
                          .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
                          .replace(/\n/g, '<br/>')
                          .replace(/•/g, '<span class="inline-block w-4 text-purple-600">•</span>')
                      }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setGeneratedItinerary('');
                        setItineraryInterests([]);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Generate Another
                    </button>
                    <button
                      onClick={() => navigate('/planner')}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
                    >
                      <Calendar className="h-5 w-5" />
                      Open in Planner
                    </button>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <Users className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-green-900">
                        <p className="font-semibold mb-1">✨ Next Steps</p>
                        <p>Save this itinerary to your planner, book accommodations, and start exploring Cape Town!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
