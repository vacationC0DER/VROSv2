export type ObjectiveStatus = 'on_track' | 'caution' | 'at_risk';

export interface Objective {
  id: string;
  title: string;
  description: string | null;
  progress: number;
  status: ObjectiveStatus;
  parent_objective_id: string | null;
  department_id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  department?: {
    id: string;
    name: string;
  };
  owner?: {
    id: string;
    first_name: string;
    last_name: string;
  };
  children?: Objective[];
}