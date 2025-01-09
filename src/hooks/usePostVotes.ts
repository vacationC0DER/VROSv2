import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function usePostVotes(postId: string) {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVote() {
      try {
        const { data } = await supabase
          .from('forum_votes')
          .select('vote_type')
          .eq('target_type', 'post')
          .eq('target_id', postId)
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
          .single();

        setUserVote(data?.vote_type || null);
      } catch (error) {
        console.error('Error fetching vote:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVote();
  }, [postId]);

  return { userVote, loading };
}