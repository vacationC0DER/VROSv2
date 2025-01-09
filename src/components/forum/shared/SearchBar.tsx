import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useForumStore } from '../../../stores/forumStore';
import { SearchResults } from './SearchResults';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { searchPosts, clearSearch } = useForumStore();

  // Debounce search to avoid too many requests
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchPosts(query);
        setShowResults(true);
      } else {
        clearSearch();
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchPosts, clearSearch]);

  const handleClear = () => {
    setQuery('');
    clearSearch();
    setShowResults(false);
  };

  return (
    <div className="relative">
      <form 
        onSubmit={(e) => e.preventDefault()} 
        className="relative"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search discussions..."
          className="w-full px-4 py-3 pl-12 pr-10 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </form>

      {showResults && <SearchResults onClose={() => setShowResults(false)} />}
    </div>
  );
}