import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { KnowledgeCategory, KnowledgeArticle } from '../types/knowledge';

interface KnowledgeState {
  categories: KnowledgeCategory[];
  articles: KnowledgeArticle[];
  searchResults: KnowledgeArticle[];
  loading: boolean;
  searchLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  fetchArticles: (categoryId?: string) => Promise<void>;
  searchArticles: (query: string) => Promise<void>;
  clearSearch: () => void;
  createArticle: (data: Partial<KnowledgeArticle>) => Promise<void>;
  updateArticle: (id: string, data: Partial<KnowledgeArticle>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
}

export const useKnowledgeStore = create<KnowledgeState>((set, get) => ({
  categories: [],
  articles: [],
  searchResults: [],
  loading: false,
  searchLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('knowledge_categories')
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

  fetchArticles: async (categoryId?: string) => {
    set({ loading: true, error: null });
    try {
      let query = supabase
        .from('knowledge_articles')
        .select(`
          *,
          category:knowledge_categories(*),
          author:users(first_name, last_name),
          attachments:knowledge_attachments(*)
        `)
        .eq('status', 'published')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      set({ articles: data || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error fetching articles' });
    } finally {
      set({ loading: false });
    }
  },

  searchArticles: async (query: string) => {
    set({ searchLoading: true });
    try {
      const { data, error } = await supabase
        .from('knowledge_articles')
        .select(`
          *,
          category:knowledge_categories(*),
          author:users(first_name, last_name)
        `)
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ searchResults: data || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error searching articles' });
    } finally {
      set({ searchLoading: false });
    }
  },

  clearSearch: () => {
    set({ searchResults: [] });
  },

  createArticle: async (data) => {
    try {
      const { error } = await supabase
        .from('knowledge_articles')
        .insert([data]);

      if (error) throw error;
      get().fetchArticles(data.category_id);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error creating article' });
      throw error;
    }
  },

  updateArticle: async (id, data) => {
    try {
      const { error } = await supabase
        .from('knowledge_articles')
        .update(data)
        .eq('id', id);

      if (error) throw error;
      get().fetchArticles(data.category_id);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error updating article' });
      throw error;
    }
  },

  deleteArticle: async (id) => {
    try {
      const { error } = await supabase
        .from('knowledge_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      get().fetchArticles();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error deleting article' });
      throw error;
    }
  }
}));