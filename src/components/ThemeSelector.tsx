import React from 'react';
import { Cloud, Sun, Snowflake } from 'lucide-react';
import { WeatherTheme } from '../types/weather';

interface ThemeSelectorProps {
  currentTheme: WeatherTheme;
  onThemeChange: (theme: WeatherTheme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const handleThemeChange = (theme: WeatherTheme) => {
    onThemeChange(theme);
  };

  return (
    <div className="z-10 fixed top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-2 flex gap-2">
      <button
        onClick={() => handleThemeChange('winter')}
        className={`p-2 rounded-full transition-all ${
          currentTheme === 'winter'
            ? 'bg-blue-500 text-white'
            : 'hover:bg-blue-200'
        }`}
        aria-label="Switch to winter theme"
      >
        <Snowflake size={24} />
      </button>
      <button
        onClick={() => handleThemeChange('rain')}
        className={`p-2 rounded-full transition-all ${
          currentTheme === 'rain'
            ? 'bg-gray-600 text-white'
            : 'hover:bg-gray-200'
        }`}
        aria-label="Switch to rainy theme"
      >
        <Cloud size={24} />
      </button>
      <button
        onClick={() => handleThemeChange('summer')}
        className={`p-2 rounded-full transition-all ${
          currentTheme === 'summer'
            ? 'bg-yellow-500 text-white'
            : 'hover:bg-yellow-200'
        }`}
        aria-label="Switch to summer theme"
      >
        <Sun size={24} />
      </button>
    </div>
  );
};

export default ThemeSelector;
