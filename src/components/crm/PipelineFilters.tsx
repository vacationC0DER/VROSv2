import React from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface PipelineFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  propertyType: string;
  onPropertyTypeChange: (value: string) => void;
  valueRange: string;
  onValueRangeChange: (value: string) => void;
}

export function PipelineFilters({
  search,
  onSearchChange,
  propertyType,
  onPropertyTypeChange,
  valueRange,
  onValueRangeChange
}: PipelineFiltersProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Property Type Filter */}
        <div className="min-w-[200px]">
          <select
            value={propertyType}
            onChange={(e) => onPropertyTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Property Types</option>
            <option value="vacation_home">Vacation Home</option>
            <option value="condo">Condo</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
          </select>
        </div>

        {/* Value Range Filter */}
        <div className="min-w-[200px]">
          <select
            value={valueRange}
            onChange={(e) => onValueRangeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Values</option>
            <option value="0-500000">Under $500,000</option>
            <option value="500000-1000000">$500,000 - $1M</option>
            <option value="1000000-2000000">$1M - $2M</option>
            <option value="2000000+">Over $2M</option>
          </select>
        </div>

        {/* View Options */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Filter className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}