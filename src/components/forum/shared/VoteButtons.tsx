import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useVoting } from '../../../hooks/useVoting';

interface VoteButtonsProps {
  targetType: 'post' | 'comment';
  targetId: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export function VoteButtons({ 
  targetType,
  targetId,
  upvotes,
  downvotes,
  userVote,
  disabled,
  size = 'md'
}: VoteButtonsProps) {
  const { vote, loading } = useVoting(targetType, targetId);

  const sizeClasses = size === 'sm' 
    ? 'px-1.5 py-0.5 text-xs'
    : 'px-2 py-1 text-sm';

  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => vote('up')}
        disabled={disabled || loading}
        className={`flex items-center gap-1 ${sizeClasses} rounded-lg transition-colors ${
          userVote === 'up'
            ? 'bg-green-100 text-green-700'
            : 'hover:bg-gray-100 text-gray-600'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title="Upvote"
      >
        <ThumbsUp className={iconSize} />
        <span>{upvotes}</span>
      </button>

      <button
        onClick={() => vote('down')}
        disabled={disabled || loading}
        className={`flex items-center gap-1 ${sizeClasses} rounded-lg transition-colors ${
          userVote === 'down'
            ? 'bg-red-100 text-red-700'
            : 'hover:bg-gray-100 text-gray-600'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title="Downvote"
      >
        <ThumbsDown className={iconSize} />
        <span>{downvotes}</span>
      </button>
    </div>
  );
}