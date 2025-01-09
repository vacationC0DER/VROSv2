-- Drop existing policies
DROP POLICY IF EXISTS "Project comments are readable by authenticated users" ON project_comments;
DROP POLICY IF EXISTS "Department members can create comments" ON project_comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON project_comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON project_comments;

-- Create new simplified policies
CREATE POLICY "Anyone can read comments"
  ON project_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON project_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON project_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON project_comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);