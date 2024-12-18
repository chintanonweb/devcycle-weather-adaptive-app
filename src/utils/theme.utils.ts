import { WeatherData, WeatherTheme } from '../types/weather';

export const determineTheme = (data: WeatherData): WeatherTheme => {
  const code = data.current.condition.code;
  const temp = data.current.temp_c;
  
  if (temp <= 5 || (code >= 1066 && code <= 1225)) {
    return 'winter';
  } else if (code >= 1063 && code <= 1201) {
    return 'rain';
  }
  return 'summer';
};