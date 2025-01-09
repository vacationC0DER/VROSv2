import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { KPI } from '../types/kpi';

interface KPIState {
  kpis: KPI[];
  loading: boolean;
  error: string | null;
  timeframe: 'day' | 'week' | 'month' | 'quarter';
  selectedCategory: string | null;
  fetchKPIs: () => Promise<void>;
  updateKPI: (id: string, data: Partial<KPI>) => Promise<void>;
  setTimeframe: (timeframe: 'day' | 'week' | 'month' | 'quarter') => void;
  setSelectedCategory: (category: string | null) => void;
}

export const useKPIStore = create<KPIState>((set, get) => ({
  kpis: [],
  loading: false,
  error: null,
  timeframe: 'month',
  selectedCategory: null,

  fetchKPIs: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('kpis')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ kpis: data as KPI[] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateKPI: async (id: string, data: Partial<KPI>) => {
    try {
      const { error } = await supabase
        .from('kpis')
        .update(data)
        .eq('id', id);

      if (error) throw error;
      
      // Refresh KPIs after update
      get().fetchKPIs();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  setTimeframe: (timeframe) => set({ timeframe }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));