import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useProjectComments } from '../../../hooks/useProjectComments';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { ErrorAlert } from '../../shared/ErrorAlert';

interface DiscussionSectionProps {
  projectId: string;
  title?: string;
}

export function DiscussionSection({ projectId, title = "Discussions" }: DiscussionSectionProps) {
  const { user } = useAuth();
  const { 
    comments, 
    loading, 
    error,
    addComment,
    updateComment,
    deleteComment
  } = useProjectComments(projectId);

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
        {title}
      </h3>

      <CommentList
        comments={comments}
        currentUserId={user?.id || ''}
        onUpdate={updateComment}
        onDelete={deleteComment}
      />

      <CommentForm 
        onSubmit={addComment}
        placeholder="Share your thoughts..."
      />
    </section>
  );
}