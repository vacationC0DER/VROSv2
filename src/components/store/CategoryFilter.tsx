import React from 'react';
import { Store, Bed, Droplets } from 'lucide-react';

const categories = [
  { id: 'supplies', name: 'Supplies', icon: <Store className="h-5 w-5" /> },
  { id: 'linens', name: 'Linens', icon: <Bed className="h-5 w-5" /> },
  { id: 'towels', name: 'Towels', icon: <Droplets className="h-5 w-5" /> }
];

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-lg ${
          !selectedCategory ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            selectedCategory === category.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {category.icon}
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}