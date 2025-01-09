import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ProjectMember } from '../types/project';

export function useProjectMembers(projectId: string) {
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const { data, error } = await supabase
          .from('project_members')
          .select(`
            project_id,
            user_id,
            role,
            user:users(first_name, last_name, email)
          `)
          .eq('project_id', projectId);

        if (error) throw error;
        setMembers(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch project members'));
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, [projectId]);

  return { members, loading, error };
}