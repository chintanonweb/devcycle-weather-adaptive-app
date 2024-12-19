import React from 'react';
import { WeatherData } from '../types/weather';

interface WeatherInfoProps {
  weather: WeatherData | null;
  unit: 'C' | 'F';
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather, unit }) => {
  if (!weather) return null;

  return (
    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md rounded-lg p-4">
      <h2 className="text-2xl font-bold">{weather.location.name}</h2>
      <p className="text-lg">{weather.location.country}</p>
      <p className="text-3xl font-bold mt-2">{weather.current.temp_c}°C</p>
      <p className="text-lg">{weather.current.condition.text}</p>
    </div>
  );
};

export default WeatherInfo;