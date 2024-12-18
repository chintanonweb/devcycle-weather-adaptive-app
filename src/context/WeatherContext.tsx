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
  enableWeatherEffects: boolean;
  enableManualTheme: boolean;
  isLoading: boolean;
  error: string | null;
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

  const enableWeatherEffects =
    dvcClient?.variable(FEATURE_FLAGS.ENABLE_WEATHER_EFFECTS, true)?.value ??
    true;
  const enableManualTheme =
    dvcClient?.variable(FEATURE_FLAGS.ENABLE_MANUAL_THEME, true)?.value ?? true;
  const refreshInterval =
    dvcClient?.variable(FEATURE_FLAGS.WEATHER_REFRESH_INTERVAL, 300000)
      ?.value ?? 300000;

  const fetchWeather = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData();
      setWeather(data);
      // Only update theme automatically if manual theme is not enabled
      if (!enableManualTheme) {
        setTheme(determineTheme(data));
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
      console.error('Error fetching weather:', err);
    } finally {
      setIsLoading(false);
    }
  }, [enableManualTheme]);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchWeather, refreshInterval]);

  const handleThemeChange = useCallback((newTheme: WeatherTheme) => {
    setTheme(newTheme);
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        theme,
        setTheme: handleThemeChange,
        enableWeatherEffects,
        enableManualTheme,
        isLoading,
        error,
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
