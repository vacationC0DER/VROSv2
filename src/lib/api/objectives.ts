import { supabase } from '../supabase';
import type { Objective } from '../../types/objective';

export async function fetchObjectives(): Promise<Objective[]> {
  const { data, error } = await supabase
    .from('objectives')
    .select(`
      *,
      department:departments(id, name),
      owner:users!objectives_owner_id_fkey(id, first_name, last_name),
      children:objectives!parent_objective_id(
        id,
        title,
        description,
        progress,
        status
      )
    `)
    .is('parent_objective_id', null) // Only fetch top-level objectives
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchChildObjectives(parentId: string): Promise<Objective[]> {
  const { data, error } = await supabase
    .from('objectives')
    .select(`
      *,
      department:departments(id, name),
      owner:users!objectives_owner_id_fkey(id, first_name, last_name)
    `)
    .eq('parent_objective_id', parentId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}