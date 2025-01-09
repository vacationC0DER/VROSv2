import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { ScheduleTask } from '../types/schedule';

type ViewMode = 'month' | 'week' | 'workWeek' | 'day';

interface ScheduleState {
  tasks: ScheduleTask[];
  currentDate: Date;
  viewMode: ViewMode;
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
  setCurrentDate: (date: Date) => void;
  setViewMode: (mode: ViewMode) => void;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  tasks: [],
  currentDate: new Date(),
  viewMode: 'month',
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('schedule_tasks')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      set({ tasks: data || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch tasks' });
    } finally {
      set({ loading: false });
    }
  },

  toggleTaskCompletion: async (id: string) => {
    const task = get().tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const { error } = await supabase
        .from('schedule_tasks')
        .update({ completed: !task.completed })
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        tasks: state.tasks.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      }));
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  },

  setCurrentDate: (date: Date) => set({ currentDate: date }),
  setViewMode: (mode: ViewMode) => set({ viewMode: mode })
}));