import { useState, useEffect } from 'react';
import { useDevCycleClient } from '@devcycle/react-client-sdk';
import { WeatherData, WeatherTheme } from '../types/weather';
import { fetchWeatherData } from '../services/weather.service';
import { determineTheme } from '../utils/theme.utils';
import { FEATURE_FLAGS } from '../config/constants';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [theme, setTheme] = useState<WeatherTheme>('summer');
  const { variableValue } = useDevCycleClient();
  
  const refreshInterval = variableValue(FEATURE_FLAGS.WEATHER_REFRESH_INTERVAL, 300000); // Default: 5 minutes

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await fetchWeatherData();
        setWeather(data);
        setTheme(determineTheme(data));
      } catch (error) {
        console.error('Error in useWeather:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { weather, theme, setTheme };
};