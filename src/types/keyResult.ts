export interface KeyResult {
  id: string;
  title: string;
  description: string | null;
  metric_type: 'number' | 'percentage' | 'currency' | 'boolean';
  target_value: number;
  current_value: number;
  created_at: string;
  updated_at: string;
  owner: {
    first_name: string;
    last_name: string;
  };
}