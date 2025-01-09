-- Create search logs table
CREATE TABLE forum_search_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  query text NOT NULL,
  results_count integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE forum_search_logs ENABLE ROW LEVEL SECURITY;

-- Only allow inserts and selects
CREATE POLICY "Anyone can insert search logs"
  ON forum_search_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view search logs"
  ON forum_search_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );