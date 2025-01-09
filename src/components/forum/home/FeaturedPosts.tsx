import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pin, Eye, Calendar } from 'lucide-react';
import { useForumStore } from '../../../stores/forumStore';
import { formatTimeAgo } from '../../../utils/formatters';

export function FeaturedPosts() {
  const { posts, fetchPosts } = useForumStore();
  const pinnedPosts = posts.filter(post => post.is_pinned);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (!pinnedPosts.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Pin className="h-5 w-5" />
        Featured Discussions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pinnedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/forum/post/${post.id}`}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold mb-2">{post.title}</h3>
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
    </div>
  );
}