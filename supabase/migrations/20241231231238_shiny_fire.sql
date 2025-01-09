/*
  # Update Project Core Objectives Structure

  1. Changes
    - Add core_objective_id to projects table
    - Create triggers to enforce relationships between projects, objectives, and core objectives
    - Update existing projects with core objective references
*/

-- Add core_objective_id to projects table
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS core_objective_id uuid REFERENCES objectives(id);

-- Update projects to link to core objectives based on their linked objective's category
DO $$
BEGIN
  -- Financial objectives
  UPDATE projects
  SET core_objective_id = 'c0000000-0000-4000-a000-000000000001'
  WHERE EXISTS (
    SELECT 1 FROM objectives o
    WHERE o.id = projects.objective_id
    AND o.category LIKE 'F%'
  );

  -- Customer objectives
  UPDATE projects
  SET core_objective_id = 'c0000000-0000-4000-a000-000000000002'
  WHERE EXISTS (
    SELECT 1 FROM objectives o
    WHERE o.id = projects.objective_id
    AND o.category LIKE 'C%'
  );

  -- Process objectives
  UPDATE projects
  SET core_objective_id = 'c0000000-0000-4000-a000-000000000003'
  WHERE EXISTS (
    SELECT 1 FROM objectives o
    WHERE o.id = projects.objective_id
    AND o.category LIKE 'P%'
  );

  -- Enabler objectives
  UPDATE projects
  SET core_objective_id = 'c0000000-0000-4000-a000-000000000004'
  WHERE EXISTS (
    SELECT 1 FROM objectives o
    WHERE o.id = projects.objective_id
    AND o.category LIKE 'E%'
  );
END $$;

-- Make objective_id required
ALTER TABLE projects
ALTER COLUMN objective_id SET NOT NULL;

-- Make core_objective_id required
ALTER TABLE projects
ALTER COLUMN core_objective_id SET NOT NULL;

-- Create function to validate project relationships
CREATE OR REPLACE FUNCTION validate_project_relationships()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if core_objective_id refers to a core objective (no parent)
  IF EXISTS (
    SELECT 1 FROM objectives
    WHERE id = NEW.core_objective_id
    AND parent_objective_id IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'core_objective_id must reference a core objective';
  END IF;

  -- Check if objective belongs to core objective
  IF NOT EXISTS (
    SELECT 1 FROM objectives
    WHERE id = NEW.objective_id
    AND parent_objective_id = NEW.core_objective_id
  ) THEN
    RAISE EXCEPTION 'objective must belong to the specified core objective';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce relationships
DROP TRIGGER IF EXISTS enforce_project_relationships ON projects;
CREATE TRIGGER enforce_project_relationships
  BEFORE INSERT OR UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION validate_project_relationships();

-- Update RLS policies
DROP POLICY IF EXISTS "Projects are readable by authenticated users" ON projects;
CREATE POLICY "Projects are readable by authenticated users"
  ON projects FOR SELECT
  TO authenticated
  USING (true);