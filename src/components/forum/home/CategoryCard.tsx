import React from 'react';
import { Link } from 'react-router-dom';
import type { ForumCategory } from '../../../types/forum';

interface CategoryCardProps {
  category: ForumCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/forum/category/${category.slug}`}
      className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
    >
      {category.icon && (
        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
          <span className="text-2xl">{category.icon}</span>
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
      {category.description && (
        <p className="text-gray-600">{category.description}</p>
      )}
    </Link>
  );
}