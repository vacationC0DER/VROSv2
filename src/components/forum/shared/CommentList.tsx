import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { VoteButtons } from './VoteButtons';
import { KarmaDisplay } from './KarmaDisplay';
import type { ForumComment } from '../../../types/forum';
import { formatTimeAgo } from '../../../utils/formatters';

interface CommentListProps {
  comments: ForumComment[];
  userVotes?: Record<string, 'up' | 'down'>;
}

export function CommentList({ comments, userVotes = {} }: CommentListProps) {
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
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {comment.author?.first_name} {comment.author?.last_name}
                  </span>
                  <KarmaDisplay points={comment.author_karma || 0} />
                  <span className="text-sm text-gray-500">
                    {formatTimeAgo(comment.created_at)}
                  </span>
                </div>
                <p className="text-gray-700 mt-2">{comment.content}</p>
              </div>
              
              <VoteButtons
                targetType="comment"
                targetId={comment.id}
                upvotes={comment.upvotes}
                downvotes={comment.downvotes}
                userVote={userVotes[comment.id]}
                disabled={!user}
                size="sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}