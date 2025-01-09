import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useComments } from '../../../hooks/useComments';
import { CommentList } from '../shared/CommentList';
import { CommentForm } from '../shared/CommentForm';

interface PostCommentsProps {
  postId: string;
}

export function PostComments({ postId }: PostCommentsProps) {
  const { user } = useAuth();
  const { comments, loading, error, addComment } = useComments(postId);
  const [showForm, setShowForm] = useState(false);

  if (loading || error) return null;

  return (
    <div className="border-t border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments ({comments.length})
          </h3>
          {user && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Add Comment
            </button>
          )}
        </div>

        {showForm && (
          <div className="mb-6">
            <CommentForm
              onSubmit={async (content) => {
                await addComment(content);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <CommentList comments={comments} />
      </div>
    </div>
  );
}