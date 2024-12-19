export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1'; // Changed to HTTPS
export const DEVCYCLE_CLIENT_KEY = import.meta.env.VITE_DEVCYCLE_CLIENT_KEY;

export const FEATURE_FLAGS = {
  ENABLE_WEATHER_EFFECTS: 'enable-weather-effects',
  ENABLE_MANUAL_THEME: 'enable-manual-theme',
  WEATHER_REFRESH_INTERVAL: 'weather-refresh-interval',
  ENABLE_LOCATION_SEARCH: 'enable-location-search',
  ENABLE_TEMPERATURE_UNIT_TOGGLE: 'enable-temperature-unit-toggle',
  ENABLE_WEATHER_ALERTS: 'enable-weather-alerts',
  ENABLE_FORECAST: 'enable-forecast',
  ENABLE_DARK_MODE: 'enable-dark-mode',
  DEFAULT_TEMPERATURE_UNIT: 'default-temperature-unit'
} as const;