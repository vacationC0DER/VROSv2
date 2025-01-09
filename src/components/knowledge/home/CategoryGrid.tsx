import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useKnowledgeStore } from '../../../stores/knowledgeStore';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { ErrorAlert } from '../../shared/ErrorAlert';

export function CategoryGrid() {
  const { categories, loading, error, fetchCategories } = useKnowledgeStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/knowledge/category/${category.slug}`}
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
      ))}
    </div>
  );
}