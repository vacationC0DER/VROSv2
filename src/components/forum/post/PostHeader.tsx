import React from 'react';
import { Eye, Calendar } from 'lucide-react';
import { VoteButtons } from '../shared/VoteButtons';
import { KarmaDisplay } from '../shared/KarmaDisplay';
import type { ForumPost } from '../../../types/forum';
import { formatTimeAgo } from '../../../utils/formatters';

interface PostHeaderProps {
  post: ForumPost;
  userVote?: 'up' | 'down' | null;
}

export function PostHeader({ post, userVote }: PostHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <VoteButtons
          targetType="post"
          targetId={post.id}
          upvotes={post.upvotes}
          downvotes={post.downvotes}
          userVote={userVote}
        />
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-2">
          {post.author?.first_name} {post.author?.last_name}
          <KarmaDisplay points={post.author_karma || 0} />
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