import React from 'react';
import { TrendingUp, Clock, BarChart2, AlertTriangle } from 'lucide-react';

type SortOption = 'hot' | 'new' | 'top' | 'controversial';

interface SortOptionsProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortOptions({ value, onChange }: SortOptionsProps) {
  const options: Array<{
    value: SortOption;
    label: string;
    icon: React.ReactNode;
  }> = [
    { value: 'hot', label: 'Hot', icon: <TrendingUp className="h-4 w-4" /> },
    { value: 'new', label: 'New', icon: <Clock className="h-4 w-4" /> },
    { value: 'top', label: 'Top', icon: <BarChart2 className="h-4 w-4" /> },
    { value: 'controversial', label: 'Controversial', icon: <AlertTriangle className="h-4 w-4" /> }
  ];

  return (
    <div className="flex items-center gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
            value === option.value
              ? 'bg-indigo-100 text-indigo-700'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          {option.icon}
          <span className="text-sm font-medium">{option.label}</span>
        </button>
      ))}
    </div>
  );
}