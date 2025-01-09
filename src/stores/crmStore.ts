import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Deal {
  id: string;
  property_address: string;
  owner_name: string;
  owner_email: string;
  owner_phone: string;
  annual_revenue: number;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  stage: 'lead' | 'contacted' | 'meeting' | 'proposal' | 'negotiation' | 'closed';
  notes: string;
  last_contact_at: string;
  created_at: string;
}

interface CRMState {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  fetchDeals: () => Promise<void>;
  createDeal: (deal: Omit<Deal, 'id' | 'created_at'>) => Promise<void>;
  updateDeal: (id: string, updates: Partial<Deal>) => Promise<void>;
}

export const useCRMStore = create<CRMState>((set, get) => ({
  deals: [],
  loading: false,
  error: null,

  fetchDeals: async () => {
    set({ loading: true, error: null });
    try {
      // Fetch initial deals
      const { data, error } = await supabase
        .from('crm_deals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ deals: data || [] });

      // Subscribe to real-time updates
      const channel = supabase
        .channel('crm_deals_changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'crm_deals'
          }, 
          () => {
            // Refresh deals when changes occur
            get().fetchDeals();
          }
        )
        .subscribe();

      // Cleanup subscription on unmount
      return () => {
        channel.unsubscribe();
      };
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch deals' });
    } finally {
      set({ loading: false });
    }
  },

  createDeal: async (deal) => {
    try {
      const { error } = await supabase
        .from('crm_deals')
        .insert([{
          ...deal,
          created_by: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (error) throw error;
      get().fetchDeals();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create deal' });
      throw error;
    }
  },

  updateDeal: async (id, updates) => {
    try {
      const { error } = await supabase
        .from('crm_deals')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      get().fetchDeals();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update deal' });
      throw error;
    }
  }
}));