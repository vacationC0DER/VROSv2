import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { ForumCategory, ForumPost } from '../types/forum';

interface ForumState {
  categories: ForumCategory[];
  posts: ForumPost[];
  searchResults: ForumPost[];
  loading: boolean;
  searchLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  fetchPosts: (categoryId?: string) => Promise<void>;
  searchPosts: (query: string) => Promise<void>;
  clearSearch: () => void;
  createPost: (data: Partial<ForumPost>) => Promise<void>;
  updatePost: (id: string, data: Partial<ForumPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

export const useForumStore = create<ForumState>((set, get) => ({
  categories: [],
  posts: [],
  searchResults: [],
  loading: false,
  searchLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('*')
        .order('position');

      if (error) throw error;
      set({ categories: data || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error fetching categories' });
    } finally {
      set({ loading: false });
    }
  },

  fetchPosts: async (categoryId?: string) => {
    set({ loading: true, error: null });
    try {
      let query = supabase
        .from('forum_posts')
        .select(`
          *,
          category:forum_categories(*),
          author:users(first_name, last_name)
        `)
        .eq('status', 'published')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      set({ posts: data || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error fetching posts' });
    } finally {
      set({ loading: false });
    }
  },

  searchPosts: async (query: string) => {
    set({ searchLoading: true });
    try {
      // Perform search
      const { data: results, error: searchError } = await supabase
        .from('forum_posts')
        .select(`
          *,
          category:forum_categories(*),
          author:users(first_name, last_name)
        `)
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (searchError) throw searchError;

      // Log the search
      const { error: logError } = await supabase
        .from('forum_search_logs')
        .insert([{
          user_id: (await supabase.auth.getUser()).data.user?.id,
          query,
          results_count: results?.length || 0
        }]);

      if (logError) {
        console.error('Failed to log search:', logError);
      }

      set({ searchResults: results || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error searching posts' });
    } finally {
      set({ searchLoading: false });
    }
  },

  clearSearch: () => {
    set({ searchResults: [] });
  },

  createPost: async (data) => {
    try {
      const { error } = await supabase
        .from('forum_posts')
        .insert([data]);

      if (error) throw error;
      get().fetchPosts(data.category_id);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error creating post' });
      throw error;
    }
  },

  updatePost: async (id, data) => {
    try {
      const { error } = await supabase
        .from('forum_posts')
        .update(data)
        .eq('id', id);

      if (error) throw error;
      get().fetchPosts(data.category_id);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error updating post' });
      throw error;
    }
  },

  deletePost: async (id) => {
    try {
      const { error } = await supabase
        .from('forum_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      get().fetchPosts();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error deleting post' });
      throw error;
    }
  }
}));