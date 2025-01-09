-- Enable RLS on core objectives
ALTER TABLE core_objectives ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for core objectives
CREATE POLICY "Anyone can read core objectives"
  ON core_objectives FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can modify core objectives
CREATE POLICY "Admins can modify core objectives"
  ON core_objectives FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Update objectives policies
DROP POLICY IF EXISTS "Anyone can read objectives" ON objectives;
DROP POLICY IF EXISTS "Users can modify objectives they own" ON objectives;

CREATE POLICY "Anyone can read objectives"
  ON objectives FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Department members can create objectives"
  ON objectives FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.department_id = objectives.department_id
    )
  );

CREATE POLICY "Department members and admins can update objectives"
  ON objectives FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND (
        users.department_id = objectives.department_id
        OR users.role = 'admin'
      )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND (
        users.department_id = objectives.department_id
        OR users.role = 'admin'
      )
    )
  );

-- Create view for objective hierarchy
CREATE OR REPLACE VIEW objective_hierarchy AS
SELECT 
  co.id as core_id,
  co.title as core_title,
  co.category as core_category,
  co.description as core_description,
  o.id as objective_id,
  o.title as objective_title,
  o.description as objective_description,
  o.progress as objective_progress,
  o.status as objective_status,
  o.department_id,
  d.name as department_name,
  o.owner_id,
  u.first_name as owner_first_name,
  u.last_name as owner_last_name,
  COUNT(p.id) as project_count,
  COALESCE(AVG(p.progress), 0) as avg_project_progress
FROM core_objectives co
LEFT JOIN objectives o ON o.parent_objective_id = co.id
LEFT JOIN departments d ON o.department_id = d.id
LEFT JOIN users u ON o.owner_id = u.id
LEFT JOIN projects p ON p.objective_id = o.id
GROUP BY 
  co.id, co.title, co.category, co.description,
  o.id, o.title, o.description, o.progress, o.status,
  o.department_id, d.name, o.owner_id, u.first_name, u.last_name;