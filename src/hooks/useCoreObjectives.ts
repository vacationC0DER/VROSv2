import { useEffect } from 'react';
import { useCoreObjectiveStore } from '../stores/coreObjectiveStore';

export function useCoreObjectives() {
  const { coreObjectives, loading, error, fetchCoreObjectives } = useCoreObjectiveStore();

  useEffect(() => {
    fetchCoreObjectives();
  }, [fetchCoreObjectives]);

  return { coreObjectives, loading, error };
}