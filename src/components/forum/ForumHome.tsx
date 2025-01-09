import React from 'react';
import { useForumStore } from '../../stores/forumStore';
import { CategoryGrid } from './home/CategoryGrid';
import { FeaturedPosts } from './home/FeaturedPosts';
import { SearchBar } from './shared/SearchBar';
import { MarketCategories } from './MarketCategories';

export function ForumHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Forum</h1>
        <p className="text-gray-600">Explore discussions and resources</p>
      </div>

      <SearchBar />
      <MarketCategories />
      <CategoryGrid />
      <FeaturedPosts />
    </div>
  );
}