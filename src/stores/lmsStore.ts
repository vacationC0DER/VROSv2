import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Course, CourseProgress, Category } from '../types/lms';

interface LMSState {
  courses: Course[];
  categories: Category[];
  userProgress: CourseProgress[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchUserProgress: () => Promise<void>;
  uploadCourse: (courseData: FormData) => Promise<void>;
  updateProgress: (courseId: string, progress: number, scormData: Record<string, any>) => Promise<void>;
}

export const useLMSStore = create<LMSState>((set, get) => ({
  courses: [],
  categories: [],
  userProgress: [],
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('lms_courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ courses: data || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch courses' });
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const { data, error } = await supabase
        .from('lms_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      set({ categories: data || [] });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },

  fetchUserProgress: async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('lms_course_progress')
        .select('*')
        .eq('user_id', user.user.id);

      if (error) throw error;
      set({ userProgress: data || [] });
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  },

  uploadCourse: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      const file = formData.get('scorm') as File;
      if (!file) throw new Error('No SCORM file provided');

      // Upload SCORM package
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('scorm-packages')
        .upload(`courses/${Date.now()}-${file.name}`, file);

      if (uploadError) throw uploadError;

      // Create course record
      const { error: courseError } = await supabase
        .from('lms_courses')
        .insert([{
          title: formData.get('title'),
          description: formData.get('description'),
          category: formData.get('category'),
          duration: parseInt(formData.get('duration') as string),
          scorm_url: fileData.path,
          author_id: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (courseError) throw courseError;
      
      await get().fetchCourses();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to upload course' });
    } finally {
      set({ loading: false });
    }
  },

  updateProgress: async (courseId: string, progress: number, scormData: Record<string, any>) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { error } = await supabase
        .from('lms_course_progress')
        .upsert({
          user_id: user.user.id,
          course_id: courseId,
          progress,
          completed: progress === 100,
          last_accessed: new Date().toISOString(),
          completion_date: progress === 100 ? new Date().toISOString() : null,
          scorm_data: scormData
        });

      if (error) throw error;
      await get().fetchUserProgress();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }
}));