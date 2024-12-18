import React from 'react';
import { motion } from 'framer-motion';
import { WeatherTheme } from '../types/weather';

interface WeatherEffectsProps {
  theme: WeatherTheme;
  enabled: boolean;
}

export const WeatherEffects: React.FC<WeatherEffectsProps> = ({ theme, enabled }) => {
  if (!enabled) return null;

  switch (theme) {
    case 'winter':
      return (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              animate={{
                y: ['0vh', '100vh'],
                x: ['-5vw', '5vw'],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
              }}
            />
          ))}
        </div>
      );
    case 'rain':
      return (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-10 bg-blue-200 opacity-50"
              animate={{
                y: ['0vh', '100vh'],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random(),
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
              }}
            />
          ))}
        </div>
      );
    case 'summer':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute bottom-0 w-[200%] h-64"
            style={{
              background: 'linear-gradient(transparent, rgba(255, 255, 255, 0.3))',
            }}
            animate={{
              x: ['-50%', '0%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      );
    default:
      return null;
  }
};