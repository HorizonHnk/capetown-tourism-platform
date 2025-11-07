// Weather Service using Open-Meteo API (FREE - no API key required!)
const CAPE_TOWN_COORDS = { lat: -33.9249, lon: 18.4241 };

// Map weather codes to conditions
const getWeatherCondition = (weatherCode) => {
  if (weatherCode === 0) return { condition: 'Clear', description: 'clear sky', icon: '01d' };
  if (weatherCode <= 3) return { condition: 'Clouds', description: 'partly cloudy', icon: '02d' };
  if (weatherCode <= 48) return { condition: 'Fog', description: 'foggy', icon: '50d' };
  if (weatherCode <= 67) return { condition: 'Rain', description: 'rainy', icon: '10d' };
  if (weatherCode <= 77) return { condition: 'Snow', description: 'snowy', icon: '13d' };
  if (weatherCode <= 82) return { condition: 'Rain', description: 'showers', icon: '09d' };
  if (weatherCode <= 99) return { condition: 'Thunderstorm', description: 'thunderstorm', icon: '11d' };
  return { condition: 'Clear', description: 'clear sky', icon: '01d' };
};

export const getCurrentWeather = async () => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${CAPE_TOWN_COORDS.lat}&longitude=${CAPE_TOWN_COORDS.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`
    );

    if (!response.ok) {
      throw new Error('Weather data not available');
    }

    const data = await response.json();
    const current = data.current;
    const weatherInfo = getWeatherCondition(current.weather_code);

    return {
      temp: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      condition: weatherInfo.condition,
      description: weatherInfo.description,
      icon: weatherInfo.icon,
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      sunrise: new Date(),
      sunset: new Date()
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Return fallback data
    return {
      temp: 22,
      feelsLike: 20,
      condition: 'Clear',
      description: 'clear sky',
      icon: '01d',
      humidity: 65,
      windSpeed: 15,
      sunrise: new Date(),
      sunset: new Date()
    };
  }
};

export const getWeatherForecast = async (days = 5) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${CAPE_TOWN_COORDS.lat}&longitude=${CAPE_TOWN_COORDS.lon}&daily=temperature_2m_max,temperature_2m_min,weather_code,relative_humidity_2m_mean,wind_speed_10m_max&timezone=auto&forecast_days=${days}`
    );

    if (!response.ok) {
      throw new Error('Forecast data not available');
    }

    const data = await response.json();
    const daily = data.daily;

    const dailyForecasts = [];
    for (let i = 0; i < daily.time.length; i++) {
      const weatherInfo = getWeatherCondition(daily.weather_code[i]);
      dailyForecasts.push({
        date: new Date(daily.time[i]),
        temp: Math.round((daily.temperature_2m_max[i] + daily.temperature_2m_min[i]) / 2),
        tempMin: Math.round(daily.temperature_2m_min[i]),
        tempMax: Math.round(daily.temperature_2m_max[i]),
        condition: weatherInfo.condition,
        description: weatherInfo.description,
        icon: weatherInfo.icon,
        humidity: Math.round(daily.relative_humidity_2m_mean[i]),
        windSpeed: Math.round(daily.wind_speed_10m_max[i])
      });
    }

    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return [];
  }
};

export const getWeatherBasedSuggestions = (weather) => {
  const { temp, condition } = weather;

  if (condition === 'Rain') {
    return {
      activities: ['Visit museums', 'Explore indoor markets', 'Wine tasting tours', 'Aquarium visit'],
      message: 'Rainy day? Perfect for indoor adventures!'
    };
  }

  if (temp > 25 && condition === 'Clear') {
    return {
      activities: ['Beach day at Camps Bay', 'Table Mountain hike', 'Clifton beach', 'Coastal drive'],
      message: 'Beautiful weather! Great day for outdoor activities.'
    };
  }

  if (temp < 15) {
    return {
      activities: ['Hot chocolate at cafes', 'Wine tasting', 'Museum visits', 'Cozy restaurants'],
      message: 'Cool weather - perfect for cozy indoor experiences.'
    };
  }

  return {
    activities: ['Kirstenbosch Gardens', 'V&A Waterfront', 'Signal Hill walk', 'City sightseeing'],
    message: 'Pleasant weather for exploring Cape Town!'
  };
};

export default {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherBasedSuggestions
};
