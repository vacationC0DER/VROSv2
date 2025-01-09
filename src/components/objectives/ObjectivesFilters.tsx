import React from 'react';
import { Filter } from 'lucide-react';
import { useObjectiveStore } from '../../stores/objectiveStore';

export function ObjectivesFilters() {
  const { selectedCategory, selectedStatus, setSelectedCategory, setSelectedStatus } = useObjectiveStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </div>
        
        <select
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All Categories</option>
          <option value="F">Financial</option>
          <option value="C">Customer</option>
          <option value="P">Process</option>
          <option value="E">Enablers</option>
        </select>

        <select
          value={selectedStatus || ''}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All Statuses</option>
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="at_risk">At Risk</option>
        </select>
      </div>
    </div>
  );
}