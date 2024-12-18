import { WeatherTheme } from '../types/weather';

export const themeConfigs: Record<WeatherTheme, {
  background: string;
  quote: string;
  image: string;
}> = {
  winter: {
    background: 'bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500',
    quote: 'Embrace the cold, find warmth within.',
    image: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&q=80',
  },
  rain: {
    background: 'bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500',
    quote: 'Let the rhythm of the rain wash away your worries.',
    image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&q=80',
  },
  summer: {
    background: 'bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500',
    quote: 'Soak up the sun, embrace the warmth.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80',
  },
};