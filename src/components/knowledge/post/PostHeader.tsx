import React from 'react';
import { Eye, Calendar } from 'lucide-react';
import type { KnowledgePost } from '../../../types/knowledge';
import { formatTimeAgo } from '../../../utils/formatters';

interface PostHeaderProps {
  post: KnowledgePost;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
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
    </div>
  );
}