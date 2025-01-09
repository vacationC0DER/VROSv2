import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useCommentVotes(commentIds: string[]) {
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down'>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVotes() {
      if (!commentIds.length) {
        setLoading(false);
        return;
      }

      try {
        const { data: user } = await supabase.auth.getUser();
        if (!user.user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('forum_votes')
          .select('target_id, vote_type')
          .eq('target_type', 'comment')
          .in('target_id', commentIds)
          .eq('user_id', user.user.id);

        if (error) throw error;

        const votes = (data || []).reduce((acc, vote) => ({
          ...acc,
          [vote.target_id]: vote.vote_type as 'up' | 'down'
        }), {});

        setUserVotes(votes);
      } catch (error) {
        console.error('Error fetching votes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVotes();
  }, [commentIds]);

  return { userVotes, loading };
}