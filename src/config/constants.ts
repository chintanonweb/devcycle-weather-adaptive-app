export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1'; // Changed to HTTPS
export const DEVCYCLE_CLIENT_KEY = import.meta.env.VITE_DEVCYCLE_CLIENT_KEY;

export const FEATURE_FLAGS = {
  ENABLE_WEATHER_EFFECTS: 'enable-weather-effects',
  ENABLE_MANUAL_THEME: 'enable-manual-theme',
  WEATHER_REFRESH_INTERVAL: 'weather-refresh-interval'
} as const;