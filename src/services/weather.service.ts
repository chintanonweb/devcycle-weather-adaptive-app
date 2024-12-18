import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_API_BASE_URL } from '../config/constants';
import { WeatherData } from '../types/weather';

const weatherAPI = axios.create({
  baseURL: WEATHER_API_BASE_URL,
  params: {
    key: WEATHER_API_KEY,
  },
});

export const fetchWeatherData = async (): Promise<WeatherData> => {
  try {
    // First try to get location using geolocation
    const position = await getCurrentPosition();
    const query = position 
      ? `${position.coords.latitude},${position.coords.longitude}`
      : 'auto:ip';

    const response = await weatherAPI.get('/current.json', {
      params: { q: query },
    });
    
    const { current, location } = response.data;
    return {
      current: {
        temp_c: current.temp_c,
        condition: {
          text: current.condition.text,
          code: current.condition.code
        }
      },
      location: {
        name: location.name,
        country: location.country
      }
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Weather API Error:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      });
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Failed to fetch weather data');
  }
};

const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      { timeout: 5000 }
    );
  });
};