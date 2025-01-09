import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useProjectComments } from '../../../hooks/useProjectComments';
import { CommentItem } from '../discussions/CommentItem';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { ErrorAlert } from '../../shared/ErrorAlert';

interface ProjectDiscussionsProps {
  projectId: string;
}

export function ProjectDiscussions({ projectId }: ProjectDiscussionsProps) {
  const { user } = useAuth();
  const { 
    comments, 
    loading, 
    error,
    addComment,
    updateComment,
    deleteComment
  } = useProjectComments(projectId);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      await addComment(newComment.trim());
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error.message} />;
  }

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-gray-500" />
        Discussions
      </h3>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserId={user?.id || ''}
            onUpdate={updateComment}
            onDelete={deleteComment}
          />
        ))}

        {comments.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No discussions yet. Start the conversation!
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
        </div>
      </form>
    </section>
  );
}