-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read core objectives" ON core_objectives;
DROP POLICY IF EXISTS "Anyone can read objectives" ON objectives;
DROP POLICY IF EXISTS "Projects are readable by authenticated users" ON projects;

-- Core Objectives policies
CREATE POLICY "Authenticated users can read core objectives"
  ON core_objectives FOR SELECT
  TO authenticated
  USING (true);

-- Objectives policies
CREATE POLICY "Authenticated users can read objectives"
  ON objectives FOR SELECT
  TO authenticated
  USING (true);

-- Projects policies
CREATE POLICY "Authenticated users can read projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

-- Ensure policies for related tables

-- Department policies
DROP POLICY IF EXISTS "Authenticated users can read departments" ON departments;
CREATE POLICY "Authenticated users can read departments"
  ON departments FOR SELECT
  TO authenticated
  USING (true);

-- Users policies
DROP POLICY IF EXISTS "Authenticated users can read users" ON users;
CREATE POLICY "Authenticated users can read users"
  ON users FOR SELECT
  TO authenticated
  USING (true);