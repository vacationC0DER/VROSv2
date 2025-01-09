export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'director' | 'manager' | 'user';
  department_id: string | null;
  created_at: string;
  updated_at: string;
}