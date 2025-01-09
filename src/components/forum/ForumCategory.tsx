import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForumStore } from '../../stores/forumStore';
import { PostList } from './category/PostList';
import { CategoryHeader } from './category/CategoryHeader';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorAlert } from '../shared/ErrorAlert';

export function ForumCategory() {
  const { categorySlug } = useParams();
  const { categories, loading, error, fetchCategories, fetchPosts } = useForumStore();
  
  const category = categories.find(c => c.slug === categorySlug);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (category) {
      fetchPosts(category.id);
    }
  }, [category, fetchPosts]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!category) return <ErrorAlert message="Category not found" />;

  return (
    <div className="space-y-8">
      <CategoryHeader category={category} />
      <PostList />
    </div>
  );
}