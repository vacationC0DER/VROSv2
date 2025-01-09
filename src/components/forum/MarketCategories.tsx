import React from 'react';
import { Link } from 'react-router-dom';
import { marketCategories } from '../../data/forumCategories';

export function MarketCategories() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Market Communities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketCategories.map((category) => (
          <Link
            key={category.id}
            to={`/forum/market/${category.slug}`}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
            <p className="text-gray-600 text-sm">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}