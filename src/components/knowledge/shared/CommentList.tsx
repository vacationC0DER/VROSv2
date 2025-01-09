import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import type { KnowledgeComment } from '../../../types/knowledge';
import { formatTimeAgo } from '../../../utils/formatters';

interface CommentListProps {
  comments: KnowledgeComment[];
}

export function CommentList({ comments }: CommentListProps) {
  const { user } = useAuth();

  if (comments.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-medium">
                {comment.author?.first_name} {comment.author?.last_name}
              </span>
              <span className="text-sm text-gray-500">
                {formatTimeAgo(comment.created_at)}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}