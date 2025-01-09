import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Objective } from '../types/objective';
import { sampleObjectives } from '../data/objectivesData';

interface ObjectiveState {
  objectives: Objective[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
  selectedStatus: string | null;
  viewMode: 'grid' | 'list';
  sortBy: string;
  fetchObjectives: () => Promise<void>;
  setSelectedCategory: (category: string | null) => void;
  setSelectedStatus: (status: string | null) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (sort: string) => void;
  getFilteredObjectives: () => Objective[];
}

export const useObjectiveStore = create<ObjectiveState>((set, get) => ({
  objectives: [],
  loading: false,
  error: null,
  selectedCategory: null,
  selectedStatus: null,
  viewMode: 'grid',
  sortBy: 'progress',

  fetchObjectives: async () => {
    set({ loading: true, error: null });
    try {
      set({ objectives: sampleObjectives });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error fetching objectives';
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSortBy: (sort) => set({ sortBy: sort }),

  getFilteredObjectives: () => {
    const { objectives, selectedCategory, selectedStatus, sortBy } = get();
    
    let filtered = objectives.filter(objective => {
      const categoryMatch = !selectedCategory || objective.category.startsWith(selectedCategory);
      const statusMatch = !selectedStatus || objective.status === selectedStatus;
      return categoryMatch && statusMatch;
    });

    // Sort objectives
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return (b.progress || 0) - (a.progress || 0);
        case 'status':
          return (a.status || '').localeCompare(b.status || '');
        case 'department':
          return (a.department?.name || '').localeCompare(b.department?.name || '');
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }
}));