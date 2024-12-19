import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useDevCycleClient } from '@devcycle/react-client-sdk';
import { WeatherData, WeatherTheme } from '../types/weather';
import { fetchWeatherData } from '../services/weather.service';
import { determineTheme } from '../utils/theme.utils';
import { FEATURE_FLAGS } from '../config/constants';

interface WeatherContextType {
  weather: WeatherData | null;
  theme: WeatherTheme;
  setTheme: (theme: WeatherTheme) => void;
  temperatureUnit: 'C' | 'F';
  toggleTemperatureUnit: () => void;
  enableWeatherEffects: boolean;
  enableManualTheme: boolean;
  enableLocationSearch: boolean;
  enableTemperatureToggle: boolean;
  enableDarkMode: boolean;
  isLoading: boolean;
  error: string | null;
  searchLocation: (query: string) => Promise<void>;
  refetchWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [theme, setTheme] = useState<WeatherTheme>('winter');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dvcClient = useDevCycleClient();

  // DevCycle feature flags
  const enableWeatherEffects =
    dvcClient?.variable(FEATURE_FLAGS.ENABLE_WEATHER_EFFECTS, true)?.value ??
    true;
  const enableManualTheme =
    dvcClient?.variable(FEATURE_FLAGS.ENABLE_MANUAL_THEME, true)?.value ?? true;
  const enableLocationSearch =
    dvcClient?.variable(FEATURE_FLAGS.ENABLE_LOCATION_SEARCH, true)?.value ??
    true;
  const enableTemperatureToggle =
    dvcClient?.variable(FEATURE_FLAGS.ENABLE_TEMPERATURE_UNIT_TOGGLE, true)
      ?.value ?? true;
  const enableDarkMode =
    dvcClient?.variable(FEATURE_FLAGS.ENABLE_DARK_MODE, false)?.value ?? false;
  const defaultTempUnit = dvcClient?.variable(
    FEATURE_FLAGS.DEFAULT_TEMPERATURE_UNIT,
    'C'
  )?.value as 'C' | 'F';
  const refreshInterval =
    dvcClient?.variable(FEATURE_FLAGS.WEATHER_REFRESH_INTERVAL, 300000)
      ?.value ?? 300000;

  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>(
    defaultTempUnit
  );

  const toggleTemperatureUnit = useCallback(() => {
    setTemperatureUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  }, []);

  const fetchWeather = useCallback(
    async (query?: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(query);
        setWeather(data);
        if (enableManualTheme) {
          setTheme(determineTheme(data));
        }
      } catch (err) {
        setError('Failed to fetch weather data. Please try again later.');
        console.error('Error fetching weather:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [enableManualTheme]
  );

  const searchLocation = useCallback(
    async (query: string) => {
      await fetchWeather(query);
    },
    [fetchWeather]
  );

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(() => fetchWeather(), refreshInterval);
    return () => clearInterval(interval);
  }, [fetchWeather, refreshInterval]);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        theme,
        setTheme,
        temperatureUnit,
        toggleTemperatureUnit,
        enableWeatherEffects,
        enableManualTheme,
        enableLocationSearch,
        enableTemperatureToggle,
        enableDarkMode,
        isLoading,
        error,
        searchLocation,
        refetchWeather: fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
