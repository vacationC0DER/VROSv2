import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Conversation } from '../types/message';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .select(`
            *,
            participants:conversation_participants(
              user_id,
              user:users(first_name, last_name)
            ),
            last_message:messages(
              id,
              content,
              created_at,
              sender:users!sender_id(first_name, last_name)
            )
          `)
          .order('updated_at', { ascending: false });

        if (error) throw error;
        
        // Transform the data to handle the one-to-many relationships
        const transformedData = data.map(conversation => ({
          ...conversation,
          participants: conversation.participants || [],
          last_message: conversation.last_message?.[0] || null
        }));

        setConversations(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch conversations'));
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();

    // Subscribe to changes
    const channel = supabase
      .channel('conversations_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'conversations'
        }, 
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return { conversations, loading, error };
}