export interface Department {
  id: string;
  name: string;
  position: number;
  head_user_id: string | null;
  created_at: string;
  updated_at: string;
  head?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  member_count?: number;
}