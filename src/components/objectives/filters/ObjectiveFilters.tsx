import React from 'react';
import { Filter } from 'lucide-react';
import { useObjectiveStore } from '../../../stores/objectiveStore';

const CATEGORIES = [
  { value: 'F1', label: 'Financial 1' },
  { value: 'F2', label: 'Financial 2' },
  { value: 'C1', label: 'Customer 1' },
  { value: 'C2', label: 'Customer 2' },
  { value: 'P1', label: 'Process 1' },
  { value: 'P2', label: 'Process 2' },
];

const STATUS_OPTIONS = [
  { value: 'not_started', label: 'Not Started' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'at_risk', label: 'At Risk' },
];

export function ObjectiveFilters() {
  const { selectedCategory, setSelectedCategory } = useObjectiveStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </div>
        
        <select
          className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        <select
          className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          defaultValue=""
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}