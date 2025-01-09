import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { KnowledgeCategory } from '../../../types/knowledge';

interface CategoryHeaderProps {
  category: KnowledgeCategory;
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="space-y-4">
      <Link 
        to="/knowledge"
        className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Knowledge Base
      </Link>

      <div>
        <h1 className="text-2xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600 mt-1">{category.description}</p>
        )}
      </div>
    </div>
  );
}