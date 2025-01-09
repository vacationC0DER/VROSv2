/*
  # Update RLS Policies

  1. Changes
    - Drop existing policies
    - Add comprehensive RLS policies for all tables
    - Ensure authenticated users can read necessary data
    - Restrict write operations appropriately
*/

-- Users table policies
DROP POLICY IF EXISTS "Users are readable by authenticated users" ON users;
CREATE POLICY "Users are readable by authenticated users"
  ON users FOR SELECT
  TO authenticated
  USING (true);

-- Departments table policies
DROP POLICY IF EXISTS "Departments are readable by authenticated users" ON departments;
CREATE POLICY "Departments are readable by authenticated users"
  ON departments FOR SELECT
  TO authenticated
  USING (true);

-- Objectives table policies
DROP POLICY IF EXISTS "Objectives are readable by authenticated users" ON objectives;
DROP POLICY IF EXISTS "Users can modify objectives they own" ON objectives;

CREATE POLICY "Objectives are readable by authenticated users"
  ON objectives FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert objectives"
  ON objectives FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their objectives"
  ON objectives FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Projects table policies
DROP POLICY IF EXISTS "Users can view projects in their department" ON projects;
DROP POLICY IF EXISTS "Projects are readable by authenticated users" ON projects;

CREATE POLICY "Projects are readable by authenticated users"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.department_id = projects.department_id
    )
  );

CREATE POLICY "Users can update their department's projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.department_id = projects.department_id
    )
  );

-- KPIs table policies
DROP POLICY IF EXISTS "KPIs are readable by authenticated users" ON kpis;
CREATE POLICY "KPIs are readable by authenticated users"
  ON kpis FOR SELECT
  TO authenticated
  USING (true);

-- Project Members table policies
DROP POLICY IF EXISTS "Project members are readable by authenticated users" ON project_members;
CREATE POLICY "Project members are readable by authenticated users"
  ON project_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can be added to projects"
  ON project_members FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.department_id = (
        SELECT department_id FROM projects WHERE id = project_members.project_id
      )
    )
  );