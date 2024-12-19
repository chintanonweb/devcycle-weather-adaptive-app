import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search location..."
          className="w-64 px-4 py-2 pl-10 rounded-full bg-white/10 backdrop-blur-md 
                   text-white placeholder-white/70 border border-white/20
                   focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-white/70" />
      </div>
    </motion.form>
  );
};

export default SearchBar;