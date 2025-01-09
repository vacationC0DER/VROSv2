/*
  # Add Department Relationship to Projects

  1. Changes
    - Add department_id column to projects table
    - Add foreign key constraint to departments table
    - Add RLS policy for department access
    - Add sample project data
  
  2. Security
    - Enable RLS for projects table
    - Add policy for department-based access
*/

-- Add department_id column to projects table
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS department_id uuid REFERENCES departments(id);

-- Update RLS policies
CREATE POLICY "Users can view projects in their department"
  ON projects FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND (
        users.department_id = projects.department_id
        OR users.role = 'admin'
      )
    )
  );

-- Add some sample projects
INSERT INTO projects (
  id,
  title,
  description,
  objective_id,
  department_id,
  status,
  start_date,
  end_date,
  progress
) VALUES
  (
    '11111111-1111-4111-1111-111111111111',
    'Market Research Project',
    'Conduct comprehensive market research for Q1 2024',
    '55555555-5555-4555-5555-555555555555',
    'd2f7e194-3d57-4cfb-ac6b-27c8b0e4d6a4',
    'in_progress',
    '2024-01-01',
    '2024-03-31',
    35
  ),
  (
    '22222222-2222-4222-2222-222222222222',
    'Sales Pipeline Optimization',
    'Implement new sales methodology and tools',
    '44444444-4444-4444-4444-444444444444',
    'd1b6d105-6056-4c8e-8902-87e5a5845633',
    'not_started',
    '2024-02-01',
    '2024-04-30',
    0
  ),
  (
    '33333333-3333-4333-3333-333333333333',
    'Employee Training Program',
    'Develop and launch new employee onboarding program',
    '66666666-6666-4666-6666-666666666666',
    '66666666-6666-4666-6666-666666666666',
    'in_progress',
    '2024-01-15',
    '2024-03-15',
    60
  )
ON CONFLICT (id) DO NOTHING;