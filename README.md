# Dynamic Weather-Based Landing Page
A React application that transforms its landing page based on real-time weather conditions, featuring beautiful animations and theme switching capabilities. Built with React, and DevCycle for feature management.

## Features

- 🌡️ Real-time weather data integration
- 🎨 Dynamic themes based on weather conditions:
  - ❄️ Winter theme with snowfall animation
  - 🌧️ Rain theme with rainfall animation
  - ☀️ Summer theme with wave/sun ray effects
- 🔄 Manual theme switching
- 🎯 Feature flags using DevCycle
- 📱 Responsive design
- 🌐 Geolocation support

## What I Built

This project demonstrates the power of combining real-time weather data with dynamic user interfaces. The application fetches weather information based on the user's location and automatically adjusts its theme and animations accordingly. Users can also manually switch between themes, creating an engaging and interactive experience.

Key technical features:
- Dynamic weather-based theming
- Smooth animations using Framer Motion
- Real-time weather updates
- Geolocation integration
- Devcyle Feature flag management

## My DevCycle Experience

DevCycle has been instrumental in managing feature rollouts and configurations in this project. Here's how we leveraged DevCycle's capabilities:

### Feature Flags Implementation

We integrated three main feature flags:

1. `enable-weather-effects`: Controls the visibility of weather animations
   ```typescript
   const enableWeatherEffects = dvcClient?.variable(
     FEATURE_FLAGS.ENABLE_WEATHER_EFFECTS, 
     true
   )?.value
   ```

2. `enable-manual-theme`: Toggles the ability to manually switch themes
   ```typescript
   const enableManualTheme = dvcClient?.variable(
     FEATURE_FLAGS.ENABLE_MANUAL_THEME, 
     true
   )?.value
   ```

3. `weather-refresh-interval`: Controls the frequency of weather updates
   ```typescript
   const refreshInterval = dvcClient?.variable(
     FEATURE_FLAGS.WEATHER_REFRESH_INTERVAL, 
     300000
   )?.value
   ```

### Benefits of Using DevCycle

1. **Gradual Feature Rollout**: Ability to gradually enable features for different user segments
2. **Configuration Management**: Easy management of feature flags and variables
3. **Real-time Updates**: Instant updates to feature flags without deployment
4. **Safe Feature Testing**: Risk-free testing of new features in production

### DevCycle Setup Steps

1. Create a DevCycle account and get your client key
2. Set up feature flags in DevCycle dashboard:
   - Create boolean variables for features
   - Set up targeting rules
   - Configure default values
3. Initialize DevCycle in your React app:
   ```typescript
   export default withDVCProvider({
     sdkKey: import.meta.env.VITE_DEVCYCLE_CLIENT_KEY,
     user: { user_id: 'default-user' }
   })(App);
   ```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - VITE_WEATHER_API_KEY
   - VITE_DEVCYCLE_CLIENT_KEY

4. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- DevCycle
- WeatherAPI
- Axios

## Feedback on DevCycle

DevCycle has proven to be an excellent choice for feature management:

**Pros:**
- Intuitive dashboard interface
- Excellent documentation
- Reliable SDK
- Real-time updates
- Easy integration with React

## License

MIT