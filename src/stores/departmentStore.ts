import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Department } from '../types/department';

interface DepartmentState {
  departments: Department[];
  loading: boolean;
  error: string | null;
  fetchDepartments: () => Promise<void>;
  createDepartment: (data: Partial<Department>) => Promise<void>;
  updateDepartment: (id: string, data: Partial<Department>) => Promise<void>;
}

export const useDepartmentStore = create<DepartmentState>((set, get) => ({
  departments: [],
  loading: false,
  error: null,

  fetchDepartments: async () => {
    console.log('Starting department fetch...');
    set({ loading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('position');

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        console.warn('No departments data received');
        set({ departments: [] });
        return;
      }

      console.log('Setting departments:', data);
      set({ departments: data });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error fetching departments';
      console.error('Error in fetchDepartments:', errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
      console.log('Department fetch complete');
    }
  },

  createDepartment: async (data) => {
    try {
      const { error } = await supabase
        .from('departments')
        .insert([data]);

      if (error) throw error;
      get().fetchDepartments();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error creating department';
      set({ error: errorMessage });
      throw error;
    }
  },

  updateDepartment: async (id, data) => {
    try {
      const { error } = await supabase
        .from('departments')
        .update(data)
        .eq('id', id);

      if (error) throw error;
      get().fetchDepartments();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error updating department';
      set({ error: errorMessage });
      throw error;
    }
  },
}));