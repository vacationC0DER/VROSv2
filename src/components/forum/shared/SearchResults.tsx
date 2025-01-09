import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye } from 'lucide-react';
import { useForumStore } from '../../../stores/forumStore';
import { formatTimeAgo } from '../../../utils/formatters';

interface SearchResultsProps {
  onClose: () => void;
}

export function SearchResults({ onClose }: SearchResultsProps) {
  const { searchResults, searchLoading } = useForumStore();

  if (searchLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-50 p-4">
        <div className="text-center text-gray-600">Searching...</div>
      </div>
    );
  }

  if (!searchResults.length) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-50 p-4">
        <div className="text-center text-gray-600">No results found</div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-50 max-h-96 overflow-y-auto">
      {searchResults.map((post) => (
        <Link
          key={post.id}
          to={`/forum/post/${post.id}`}
          onClick={onClose}
          className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0"
        >
          <h3 className="font-medium text-gray-900 mb-1">{post.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              {post.author?.first_name} {post.author?.last_name}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatTimeAgo(post.created_at)}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.view_count} views
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}