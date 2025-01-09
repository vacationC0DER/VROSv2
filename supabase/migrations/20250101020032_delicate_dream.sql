-- Drop existing policies first
DROP POLICY IF EXISTS "Authenticated users can read core objectives" ON core_objectives;
DROP POLICY IF EXISTS "Authenticated users can read objectives" ON objectives;
DROP POLICY IF EXISTS "Authenticated users can read projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can read departments" ON departments;
DROP POLICY IF EXISTS "Authenticated users can read users" ON users;

-- Recreate policies with consistent naming and access rules
CREATE POLICY "Authenticated users can read core objectives"
  ON core_objectives FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read objectives"
  ON objectives FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read departments"
  ON departments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read users"
  ON users FOR SELECT
  TO authenticated
  USING (true);