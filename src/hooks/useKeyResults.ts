import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { KeyResult } from '../types/keyResult';

export function useKeyResults(projectId: string) {
  const [keyResults, setKeyResults] = useState<KeyResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchKeyResults() {
      try {
        const { data, error } = await supabase
          .from('key_results')
          .select(`
            *,
            owner:users(first_name, last_name)
          `)
          .eq('project_id', projectId);

        if (error) throw error;
        setKeyResults(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch key results'));
      } finally {
        setLoading(false);
      }
    }

    fetchKeyResults();
  }, [projectId]);

  return { keyResults, loading, error };
}