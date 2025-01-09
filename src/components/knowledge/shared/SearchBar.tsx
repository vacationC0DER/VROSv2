import React, { useState } from 'react';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search:', query);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search knowledge base..."
        className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
    </form>
  );
}