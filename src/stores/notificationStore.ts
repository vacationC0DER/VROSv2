import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { StoreNotification } from '../types/store';

interface NotificationState {
  notifications: StoreNotification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('store_notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const unreadCount = data.filter(n => !n.read_at).length;
      set({ notifications: data, unreadCount, error: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error fetching notifications' });
    } finally {
      set({ loading: false });
    }
  },

  markAsRead: async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('store_notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', notificationId);

      if (error) throw error;

      set(state => ({
        notifications: state.notifications.map(n =>
          n.id === notificationId ? { ...n, readAt: new Date().toISOString() } : n
        ),
        unreadCount: state.unreadCount - 1
      }));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }
}));