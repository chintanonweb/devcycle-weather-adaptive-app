import React from 'react';
import { Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

interface TemperatureToggleProps {
  unit: 'C' | 'F';
  onToggle: () => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onToggle}
      className="hidden absolute top-4 right-24 z-20 px-4 py-2 rounded-full 
                 bg-white/10 backdrop-blur-md border border-white/20
                 text-white hover:bg-white/20 transition-colors
                 flex items-center gap-2"
    >
      <Thermometer className="w-4 h-4" />
      °{unit}
    </motion.button>
  );
};

export default TemperatureToggle;
