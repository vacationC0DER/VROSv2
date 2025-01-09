import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForumStore } from '../../../stores/forumStore';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { ErrorAlert } from '../../shared/ErrorAlert';
import { CategoryCard } from './CategoryCard';

export function CategoryGrid() {
  const { categories, loading, error, fetchCategories } = useForumStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}