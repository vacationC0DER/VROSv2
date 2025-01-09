import React from 'react';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import { CategoryGrid } from './home/CategoryGrid';
import { FeaturedPosts } from './home/FeaturedPosts';
import { SearchBar } from './shared/SearchBar';

export function KnowledgeHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Knowledge Base</h1>
        <p className="text-gray-600">Explore our documentation and resources</p>
      </div>

      <SearchBar />
      <CategoryGrid />
      <FeaturedPosts />
    </div>
  );
}