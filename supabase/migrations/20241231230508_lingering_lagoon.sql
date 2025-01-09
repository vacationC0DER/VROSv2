/*
  # Add project relationship to key results

  1. Changes
    - Add project_id column to key_results table
    - Make objective_id nullable
    - Update RLS policies for key_results table
    - Add sample key results data
*/

-- First make objective_id nullable
ALTER TABLE key_results
ALTER COLUMN objective_id DROP NOT NULL;

-- Add project_id column to key_results
ALTER TABLE key_results
ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES projects(id);

-- Update RLS policies for key_results
DROP POLICY IF EXISTS "Key results are readable by authenticated users" ON key_results;

CREATE POLICY "Key results are readable by authenticated users"
  ON key_results FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert key results"
  ON key_results FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.department_id = (
        SELECT department_id FROM projects WHERE id = key_results.project_id
      )
    )
  );

CREATE POLICY "Users can update their department's key results"
  ON key_results FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.department_id = (
        SELECT department_id FROM projects WHERE id = key_results.project_id
      )
    )
  );

-- Insert sample key results for existing projects
INSERT INTO key_results (
  id,
  project_id,
  title,
  description,
  metric_type,
  target_value,
  current_value,
  owner_id
) VALUES
  (
    gen_random_uuid(),
    (SELECT id FROM projects WHERE title = 'Market Research Project' LIMIT 1),
    'Market Research Reports',
    'Complete detailed market analysis reports',
    'number',
    3,
    1,
    '22222222-2222-4222-2222-222222222222'
  ),
  (
    gen_random_uuid(),
    (SELECT id FROM projects WHERE title = 'Sales Pipeline Optimization' LIMIT 1),
    'Sales Conversion Rate',
    'Improve sales pipeline conversion rate',
    'percentage',
    25,
    15,
    '11111111-1111-4111-1111-111111111111'
  ),
  (
    gen_random_uuid(),
    (SELECT id FROM projects WHERE title = 'Employee Training Program' LIMIT 1),
    'Training Completion Rate',
    'Employee training program completion percentage',
    'percentage',
    100,
    60,
    'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa'
  );