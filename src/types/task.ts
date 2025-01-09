export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  due_date: string;
  assignee: {
    id: string;
    first_name: string;
    last_name: string;
  };
  department_id: string;
  created_at: string;
  updated_at: string;
}