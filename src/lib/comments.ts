import { supabase } from './supabase';
import { getCurrentUser, ensureUserRecord } from './api';
import type { Comment } from '../types/comment';

export async function fetchComments(projectId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('project_comments')
    .select(`
      id,
      project_id,
      user_id,
      text,
      created_at,
      updated_at,
      user:users!inner(first_name, last_name)
    `)
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createComment(projectId: string, text: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user?.email) throw new Error('User email required');

  await ensureUserRecord(user.id, user.email);

  const { error } = await supabase
    .from('project_comments')
    .insert({
      project_id: projectId,
      user_id: user.id,
      text: text.trim()
    });

  if (error) throw error;
}

export async function updateComment(id: string, text: string): Promise<void> {
  const { error } = await supabase
    .from('project_comments')
    .update({ text: text.trim() })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteComment(id: string): Promise<void> {
  const { error } = await supabase
    .from('project_comments')
    .delete()
    .eq('id', id);

  if (error) throw error;
}