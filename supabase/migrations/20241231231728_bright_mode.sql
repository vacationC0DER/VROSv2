/*
  # Add Project Discussions

  1. New Tables
    - `project_comments`
      - `id` (uuid, primary key)
      - `project_id` (uuid, references projects)
      - `user_id` (uuid, references users)
      - `text` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on project_comments table
    - Add policies for:
      - Reading comments (authenticated users)
      - Creating comments (project team members)
      - Updating own comments
      - Deleting own comments
*/

-- Create project_comments table
CREATE TABLE IF NOT EXISTS project_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  text text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add updated_at trigger
CREATE TRIGGER update_project_comments_updated_at
  BEFORE UPDATE ON project_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable RLS
ALTER TABLE project_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Project comments are readable by authenticated users"
  ON project_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Project team members can create comments"
  ON project_comments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_id = project_comments.project_id
      AND user_id = auth.uid()
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