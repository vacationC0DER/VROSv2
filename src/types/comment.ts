export interface Comment {
  id: string;
  project_id: string;
  user_id: string;
  text: string;
  created_at: string;
  updated_at: string;
  user: {
    first_name: string;
    last_name: string;
  };
}