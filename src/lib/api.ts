import { supabase } from './supabase';

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function ensureUserRecord(userId: string, email: string) {
  const { error: checkError } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .single();

  if (checkError) {
    const { error: createError } = await supabase
      .from('users')
      .insert({
        id: userId,
        email,
        first_name: 'New',
        last_name: 'User',
        role: 'user'
      });

    if (createError) throw createError;
  }
}