/*
  # Add departments read policy

  1. Changes
    - Add policy to allow all authenticated users to read departments
*/

-- Drop any existing policies on departments
DROP POLICY IF EXISTS "Departments are readable by authenticated users" ON departments;

-- Create new read policy for departments
CREATE POLICY "Departments are readable by authenticated users"
  ON departments FOR SELECT
  TO authenticated
  USING (true);