export interface Project {
  id: string;
  title: string;
  description: string | null;
  objective_id: string;
  core_objective_id: string;
  department_id: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
  start_date: string;
  end_date: string;
  progress: number;
  created_at: string;
  updated_at: string;
  objective?: {
    id: string;
    title: string;
    category: string;
  };
  core_objective?: {
    id: string;
    title: string;
  };
  department?: {
    id: string;
    name: string;
  };
  primary_owner?: {
    id: string;
    first_name: string;
    last_name: string;
  };
  secondary_owner?: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

export interface ProjectMember {
  user_id: string;
  role: 'lead' | 'member';
  user: {
    first_name: string;
    last_name: string;
    email: string;
    avatar_url?: string;
  };
}