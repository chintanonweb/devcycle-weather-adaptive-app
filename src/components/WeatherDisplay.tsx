import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { WeatherEffects } from './WeatherEffects';
import ThemeSelector from './ThemeSelector';
import WeatherInfo from './WeatherInfo';
import { themeConfigs } from '../config/theme.config';

export const WeatherDisplay: React.FC = () => {
  const {
    weather,
    theme,
    setTheme,
    enableWeatherEffects,
    enableManualTheme,
    isLoading,
    error,
  } = useWeather();
  const config = themeConfigs[theme];
  return (
    <div
      className={`min-h-screen relative overflow-hidden ${config.background}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${config.image})`,
          opacity: 0.3,
        }}
      />

      <WeatherEffects theme={theme} enabled={enableWeatherEffects} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {error ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <>
            <h1 className="text-6xl font-bold text-white mb-8 text-center">
              {isLoading ? 'Loading...' : weather?.location.name}
            </h1>
            <p className="text-2xl text-white mb-12 text-center max-w-2xl">
              {config.quote}
            </p>
          </>
        )}
      </div>

      {!error && <WeatherInfo weather={weather} />}
      {enableManualTheme && (
        <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
      )}
    </div>
  );
};
