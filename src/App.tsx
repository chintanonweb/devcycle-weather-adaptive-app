import React from 'react';
import { withDVCProvider } from '@devcycle/react-client-sdk';
import { WeatherEffects } from './components/WeatherEffects';
import ThemeSelector from './components/ThemeSelector';
import WeatherInfo from './components/WeatherInfo';
import { WeatherProvider } from './context/WeatherContext';
import { WeatherDisplay } from './components/WeatherDisplay';
import { DEVCYCLE_CLIENT_KEY } from './config/constants';
import './styles/animations.css';

function App() {
  return (
    <WeatherProvider>
      <WeatherDisplay />
    </WeatherProvider>
  );
}

export default withDVCProvider({
  sdkKey: DEVCYCLE_CLIENT_KEY,
  user: { user_id: 'default-user' }
})(App);