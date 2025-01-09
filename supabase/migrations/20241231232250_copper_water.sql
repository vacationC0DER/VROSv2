/*
  # Fix Project Comments Access

  1. Changes
    - Update RLS policies for project_comments to allow:
      - All authenticated users to read comments
      - Project department members to create comments
      - Comment owners to update/delete their comments

  2. Security
    - Maintains data integrity
    - Ensures proper access control
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Project comments are readable by authenticated users" ON project_comments;
DROP POLICY IF EXISTS "Project team members can create comments" ON project_comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON project_comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON project_comments;

-- Create new policies
CREATE POLICY "Project comments are readable by authenticated users"
  ON project_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Department members can create comments"
  ON project_comments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users u
      JOIN projects p ON p.id = project_comments.project_id
      WHERE u.id = auth.uid()
      AND u.department_id = p.department_id
    )
  );

CREATE POLICY "Users can update their own comments"
  ON project_comments FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own comments"
  ON project_comments FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());