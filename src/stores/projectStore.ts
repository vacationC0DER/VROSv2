import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/project';

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (data: Partial<Project>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('project_details')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the flat data into the nested structure expected by the UI
      const projects = data?.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        objective_id: p.objective_id,
        core_objective_id: p.core_objective_id,
        department_id: p.department_id,
        status: p.status,
        start_date: p.start_date,
        end_date: p.end_date,
        progress: p.progress,
        created_at: p.created_at,
        updated_at: p.updated_at,
        objective: p.objective_id ? {
          id: p.objective_id,
          title: p.objective_title,
          category: p.objective_category
        } : undefined,
        core_objective: p.core_objective_id ? {
          id: p.core_objective_id,
          title: p.core_objective_title
        } : undefined,
        department: p.department_id ? {
          id: p.department_id,
          name: p.department_name
        } : undefined,
        primary_owner: p.owner_id ? {
          id: p.owner_id,
          first_name: p.owner_first_name,
          last_name: p.owner_last_name
        } : undefined,
        secondary_owner: p.secondary_owner_id ? {
          id: p.secondary_owner_id,
          first_name: p.secondary_owner_first_name,
          last_name: p.secondary_owner_last_name
        } : undefined
      })) || [];

      set({ projects });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error fetching projects';
      set({ error: errorMessage });
      console.error('Error fetching projects:', error);
    } finally {
      set({ loading: false });
    }
  },

  createProject: async (data) => {
    try {
      const { error } = await supabase
        .from('projects')
        .insert([data]);

      if (error) throw error;
      get().fetchProjects();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error creating project';
      set({ error: errorMessage });
      throw error;
    }
  },

  updateProject: async (id, data) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id);

      if (error) throw error;
      get().fetchProjects();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error updating project';
      set({ error: errorMessage });
      throw error;
    }
  },
}));