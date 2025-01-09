export interface Objective {
  id: string;
  title: string;
  description: string | null;
  category: 'C1' | 'C2' | 'F1' | 'F2' | 'P1' | 'P2';
  department_id: string;
  owner_id: string;
  parent_objective_id: string | null;
  progress: number | null;
  status: 'not_started' | 'in_progress' | 'completed' | 'at_risk';
  created_at: string;
  updated_at: string;
  department: {
    name: string;
  };
  owner: {
    first_name: string;
    last_name: string;
  };
}