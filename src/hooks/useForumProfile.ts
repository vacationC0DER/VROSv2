import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ForumProfile, KarmaHistory } from '../types/forum';

export function useForumProfile(userId: string) {
  const [profile, setProfile] = useState<ForumProfile | null>(null);
  const [karmaHistory, setKarmaHistory] = useState<KarmaHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('forum_profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch karma history
        const { data: karmaData, error: karmaError } = await supabase
          .from('forum_karma_history')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (karmaError) throw karmaError;
        setKarmaHistory(karmaData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [userId]);

  const updateProfile = async (updates: Partial<ForumProfile>) => {
    try {
      const { error } = await supabase
        .from('forum_profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      throw new Error('Failed to update profile');
    }
  };

  return {
    profile,
    karmaHistory,
    loading,
    error,
    updateProfile
  };
}