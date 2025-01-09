import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { fetchComments, createComment, updateComment, deleteComment } from '../lib/comments';
import type { Comment } from '../types/comment';

export function useProjectComments(projectId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadComments = useCallback(async () => {
    try {
      const data = await fetchComments(projectId);
      setComments(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch comments'));
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadComments();

    const channel = supabase
      .channel(`project_comments:${projectId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'project_comments',
          filter: `project_id=eq.${projectId}`
        }, 
        () => loadComments()
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [projectId, loadComments]);

  const addComment = async (text: string) => {
    try {
      await createComment(projectId, text);
      await loadComments();
    } catch (err) {
      throw new Error('Failed to add comment');
    }
  };

  const handleUpdateComment = async (id: string, text: string) => {
    try {
      await updateComment(id, text);
      await loadComments();
    } catch (err) {
      throw new Error('Failed to update comment');
    }
  };

  const handleDeleteComment = async (id: string) => {
    try {
      await deleteComment(id);
      await loadComments();
    } catch (err) {
      throw new Error('Failed to delete comment');
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
    updateComment: handleUpdateComment,
    deleteComment: handleDeleteComment
  };
}