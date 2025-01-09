import React from 'react';
import { Plus, Filter } from 'lucide-react';

interface InitiativesHeaderProps {
  onCreateClick: () => void;
}

export function InitiativesHeader({ onCreateClick }: InitiativesHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Initiatives</h1>
        <p className="text-gray-600">Track and manage strategic initiatives</p>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          <span>New Initiative</span>
        </button>
      </div>
    </div>
  );
}