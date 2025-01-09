import React from 'react';
import { LayoutGrid, List, ArrowDownUp } from 'lucide-react';
import { useObjectiveStore } from '../../stores/objectiveStore';

export function ViewOptions() {
  const { viewMode, sortBy, setViewMode, setSortBy } = useObjectiveStore();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-1.5 rounded ${
            viewMode === 'grid' 
              ? 'bg-indigo-50 text-indigo-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          title="Grid View"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-1.5 rounded ${
            viewMode === 'list' 
              ? 'bg-indigo-50 text-indigo-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          title="List View"
        >
          <List className="h-4 w-4" />
        </button>
      </div>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="progress">Progress</option>
        <option value="status">Status</option>
        <option value="department">Department</option>
        <option value="created">Created Date</option>
      </select>
    </div>
  );
}