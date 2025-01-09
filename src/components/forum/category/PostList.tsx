import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Calendar, Pin } from 'lucide-react';
import { useForumStore } from '../../../stores/forumStore';
import { formatTimeAgo } from '../../../utils/formatters';

export function PostList() {
  const { posts } = useForumStore();

  if (!posts.length) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">No posts found in this category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/forum/post/${post.id}`}
          className="block bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold truncate">{post.title}</h3>
                {post.is_pinned && (
                  <Pin className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
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
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}