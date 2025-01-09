import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { ForumComment } from '../types/forum';

export function useForumComments(postId: string) {
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('forum_comments')
        .select(`
          *,
          author:users!author_id(first_name, last_name)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch comments'));
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();

    // Subscribe to new comments
    const channel = supabase
      .channel(`post_comments:${postId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'forum_comments',
          filter: `post_id=eq.${postId}`
        }, 
        () => fetchComments()
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [postId, fetchComments]);

  const addComment = async (content: string) => {
    try {
      const { error } = await supabase
        .from('forum_comments')
        .insert([{
          post_id: postId,
          content,
          author_id: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (error) throw error;
      await fetchComments();
    } catch (err) {
      throw new Error('Failed to add comment');
    }
  };

  const updateComment = async (id: string, content: string) => {
    try {
      const { error } = await supabase
        .from('forum_comments')
        .update({ content })
        .eq('id', id);

      if (error) throw error;
      await fetchComments();
    } catch (err) {
      throw new Error('Failed to update comment');
    }
  };

  const deleteComment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('forum_comments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchComments();
    } catch (err) {
      throw new Error('Failed to delete comment');
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
    updateComment,
    deleteComment
  };
}