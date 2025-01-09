import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useVoting(targetType: 'post' | 'comment', targetId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const vote = async (voteType: 'up' | 'down') => {
    setLoading(true);
    setError(null);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      // Check for existing vote
      const { data: existingVotes, error: fetchError } = await supabase
        .from('forum_votes')
        .select('id, vote_type')
        .eq('target_type', targetType)
        .eq('target_id', targetId)
        .eq('user_id', user.user.id);

      if (fetchError) throw fetchError;

      const existingVote = existingVotes?.[0];

      // If same vote type exists, remove it (toggle off)
      if (existingVote?.vote_type === voteType) {
        const { error: deleteError } = await supabase
          .from('forum_votes')
          .delete()
          .eq('id', existingVote.id);

        if (deleteError) throw deleteError;
      } else {
        // If different vote type exists, delete it
        if (existingVote) {
          const { error: deleteError } = await supabase
            .from('forum_votes')
            .delete()
            .eq('id', existingVote.id);

          if (deleteError) throw deleteError;
        }

        // Create new vote
        const { error: insertError } = await supabase
          .from('forum_votes')
          .insert([{
            target_type: targetType,
            target_id: targetId,
            vote_type: voteType,
            user_id: user.user.id
          }]);

        if (insertError) throw insertError;
      }
    } catch (err) {
      console.error('Voting error:', err);
      setError(err instanceof Error ? err : new Error('Failed to vote'));
    } finally {
      setLoading(false);
    }
  };

  return {
    vote,
    loading,
    error
  };
}