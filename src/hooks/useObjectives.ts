import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Objective } from '../types';

export function useObjectives() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchObjectives() {
      try {
        const { data, error } = await supabase
          .from('objectives')
          .select(`
            *,
            department:departments(name),
            owner:users(first_name, last_name)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setObjectives(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch objectives'));
      } finally {
        setLoading(false);
      }
    }

    fetchObjectives();
  }, []);

  return { objectives, loading, error };
}