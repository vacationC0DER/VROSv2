import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { CoreObjective } from '../types/objective';

interface CoreObjectiveState {
  coreObjectives: CoreObjective[];
  loading: boolean;
  error: string | null;
  fetchCoreObjectives: () => Promise<void>;
}

export const useCoreObjectiveStore = create<CoreObjectiveState>((set) => ({
  coreObjectives: [],
  loading: false,
  error: null,

  fetchCoreObjectives: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('core_objectives_with_progress')
        .select('*')
        .order('order_index');

      if (error) throw error;
      set({ coreObjectives: data || [] });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error fetching core objectives';
      set({ error: errorMessage });
      console.error('Error fetching core objectives:', error);
    } finally {
      set({ loading: false });
    }
  }
}));