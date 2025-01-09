import React from 'react';
import { CommentItem } from './CommentItem';
import type { Comment } from '../../../types/comment';

interface CommentListProps {
  comments: Comment[];
  currentUserId: string;
  onUpdate: (id: string, text: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function CommentList({ comments, currentUserId, onUpdate, onDelete }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No discussions yet. Start the conversation!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}