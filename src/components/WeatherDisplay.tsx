import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { WeatherEffects } from './WeatherEffects';
import ThemeSelector from './ThemeSelector';
import WeatherInfo from './WeatherInfo';
import SearchBar from './SearchBar';
import TemperatureToggle from './TemperatureToggle';
import { themeConfigs } from '../config/theme.config';
import { motion } from 'framer-motion';

export const WeatherDisplay: React.FC = () => {
  const {
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
  } = useWeather();

  const config = themeConfigs[theme];

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${config.background} 
                 ${enableDarkMode ? 'dark' : ''}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${config.image})`,
          opacity: 0.3,
        }}
      />

      <WeatherEffects theme={theme} enabled={enableWeatherEffects} />

      {enableLocationSearch && <SearchBar onSearch={searchLocation} />}

      {enableTemperatureToggle && (
        <TemperatureToggle
          unit={temperatureUnit}
          onToggle={toggleTemperatureUnit}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
      >
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
      </motion.div>

      {!error && <WeatherInfo weather={weather} unit={temperatureUnit} />}
      {enableManualTheme && (
        <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
      )}
    </div>
  );
};
