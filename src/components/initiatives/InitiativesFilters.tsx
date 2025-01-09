import React from 'react';
import { Filter } from 'lucide-react';
import { useDepartments } from '../../hooks/useDepartments';

interface InitiativesFiltersProps {
  selectedDepartment: string | null;
  selectedCategory: string | null;
  onDepartmentChange: (departmentId: string | null) => void;
  onCategoryChange: (category: string | null) => void;
}

const CATEGORIES = [
  { value: 'financial', label: 'Financial' },
  { value: 'customer', label: 'Customer' },
  { value: 'internal', label: 'Internal Process' },
  { value: 'enablers', label: 'Enablers' }
];

export function InitiativesFilters({
  selectedDepartment,
  selectedCategory,
  onDepartmentChange,
  onCategoryChange
}: InitiativesFiltersProps) {
  const { departments, loading } = useDepartments();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </div>
        
        <select
          className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedDepartment || ''}
          onChange={(e) => onDepartmentChange(e.target.value || null)}
          disabled={loading}
        >
          <option value="">All Departments</option>
          {departments?.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>

        <select
          className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedCategory || ''}
          onChange={(e) => onCategoryChange(e.target.value || null)}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}