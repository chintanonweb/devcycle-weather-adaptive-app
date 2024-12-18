export type WeatherTheme = 'winter' | 'rain' | 'summer';

export interface WeatherData {
  current: {
    temp_c: number;
    condition: {
      text: string;
      code: number;
    };
  };
  location: {
    name: string;
    country: string;
  };
}