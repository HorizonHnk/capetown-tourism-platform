import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloud, Droplets, Wind, Sunrise, Sunset, RefreshCw, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { getCurrentWeather, getWeatherBasedSuggestions } from '../../services/weatherService';

const WeatherWidget = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Activity suggestions with links
  const activityLinks = {
    'Kirstenbosch Gardens': { path: '/attractions', search: 'kirstenbosch' },
    'V&A Waterfront': { path: '/attractions', search: 'waterfront' },
    'Signal Hill walk': { path: '/attractions', search: 'signal hill' },
    'City sightseeing': { path: '/attractions', search: '' },
    'Beach day': { path: '/attractions', search: 'beach' },
    'Table Mountain': { path: '/attractions', search: 'table mountain' },
    'Wine tasting': { path: '/attractions', search: 'wine' },
    'Indoor museums': { path: '/attractions', search: 'museum' },
    'Cafe hopping': { path: '/accommodation', search: 'restaurant' },
    'Chapman\'s Peak Drive': { path: '/attractions', search: 'chapman' }
  };

  const fetchWeather = async () => {
    const data = await getCurrentWeather();
    setWeather(data);
    setSuggestions(getWeatherBasedSuggestions(data));
  };

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      await fetchWeather();
      setLoading(false);
    };

    loadWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchWeather();
    setRefreshing(false);
  };

  const handleActivityClick = (activity) => {
    const link = activityLinks[activity];
    if (link) {
      // Navigate to the page with search parameter
      navigate(link.path + (link.search ? `?search=${encodeURIComponent(link.search)}` : ''));
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Cape Town Weather</h3>
          <p className="text-sm text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 hover:bg-blue-100 rounded-full transition-colors disabled:opacity-50"
            title="Refresh weather"
          >
            <RefreshCw className={`h-5 w-5 text-blue-600 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          <Cloud className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-baseline">
            <span className="text-5xl font-bold text-gray-900">{weather.temp}</span>
            <span className="text-2xl text-gray-600 ml-1">°C</span>
          </div>
          <p className="text-gray-600 capitalize mt-1">{weather.description}</p>
          <p className="text-sm text-gray-500 mt-1">Feels like {weather.feelsLike}°C</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-700">
            <Droplets className="h-4 w-4 mr-2 text-blue-500" />
            <span>{weather.humidity}% humidity</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Wind className="h-4 w-4 mr-2 text-blue-500" />
            <span>{weather.windSpeed} km/h wind</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Sunrise className="h-4 w-4 mr-2 text-orange-500" />
            <span>{weather.sunrise.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {suggestions && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              {suggestions.message}
            </p>
            <button
              onClick={() => navigate('/planner')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              title="Add to itinerary"
            >
              <Calendar className="h-3 w-3" />
              Plan Trip
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.activities.map((activity, index) => (
              <button
                key={index}
                onClick={() => handleActivityClick(activity)}
                className="px-3 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 hover:shadow-md transition-all flex items-center gap-1 group"
                title={`Explore ${activity}`}
              >
                {activity}
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 italic">
            💡 Click any activity to explore attractions and plan your visit
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
