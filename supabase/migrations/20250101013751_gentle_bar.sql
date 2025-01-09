/*
  # Unified Schema Update

  1. Changes
    - Creates entity_type enum for consistent type tracking
    - Adds unified progress tracking view
    - Implements automatic progress rollup calculations
    - Adds status change tracking
    - Adds secondary ownership support
    - Creates ownership tracking view
    - Adds performance optimization indexes

  2. Security
    - Maintains existing RLS policies
    - Adds data validation triggers

  3. Notes
    - All changes are backwards compatible
    - Includes automatic rollup calculations
    - Implements proper data validation
*/

-- Create an EntityType enum
CREATE TYPE entity_type AS ENUM (
  'core_objective',
  'objective',
  'project',
  'key_result',
  'task'
);

-- Create a unified tracking view
CREATE OR REPLACE VIEW unified_progress_tracking AS
SELECT
  'core_objective'::entity_type as entity_type,
  id,
  title,
  NULL as description,
  category,
  department_id,
  owner_id,
  NULL as parent_id,
  progress,
  status,
  created_at,
  updated_at
FROM objectives
WHERE parent_objective_id IS NULL

UNION ALL

SELECT
  'objective'::entity_type as entity_type,
  id,
  title,
  description,
  category,
  department_id,
  owner_id,
  parent_objective_id as parent_id,
  progress,
  status,
  created_at,
  updated_at
FROM objectives
WHERE parent_objective_id IS NOT NULL

UNION ALL

SELECT
  'project'::entity_type as entity_type,
  id,
  title,
  description,
  NULL as category,
  department_id,
  NULL as owner_id,
  objective_id as parent_id,
  progress,
  status,
  created_at,
  updated_at
FROM projects;

-- Create a function to validate progress updates
CREATE OR REPLACE FUNCTION validate_progress_update()
RETURNS trigger AS $$
BEGIN
  -- Ensure progress is between 0 and 100
  IF NEW.progress < 0 OR NEW.progress > 100 THEN
    RAISE EXCEPTION 'Progress must be between 0 and 100';
  END IF;

  -- Update parent progress for objectives
  IF TG_TABLE_NAME = 'objectives' AND NEW.parent_objective_id IS NOT NULL THEN
    UPDATE objectives
    SET progress = (
      SELECT AVG(progress)
      FROM objectives
      WHERE parent_objective_id = NEW.parent_objective_id
    )
    WHERE id = NEW.parent_objective_id;
  END IF;

  -- Update objective progress when project progress changes
  IF TG_TABLE_NAME = 'projects' THEN
    UPDATE objectives
    SET progress = (
      SELECT AVG(progress)
      FROM projects
      WHERE objective_id = NEW.objective_id
    )
    WHERE id = NEW.objective_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for progress validation
CREATE TRIGGER validate_objective_progress
  BEFORE UPDATE OF progress ON objectives
  FOR EACH ROW
  EXECUTE FUNCTION validate_progress_update();

CREATE TRIGGER validate_project_progress
  BEFORE UPDATE OF progress ON projects
  FOR EACH ROW
  EXECUTE FUNCTION validate_progress_update();

-- Add status change tracking
ALTER TABLE objectives
ADD COLUMN IF NOT EXISTS status_changed_at timestamptz DEFAULT NOW();

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS status_changed_at timestamptz DEFAULT NOW();

-- Create function to track status changes
CREATE OR REPLACE FUNCTION track_status_change()
RETURNS trigger AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    NEW.status_changed_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for status tracking
CREATE TRIGGER track_objective_status
  BEFORE UPDATE OF status ON objectives
  FOR EACH ROW
  EXECUTE FUNCTION track_status_change();

CREATE TRIGGER track_project_status
  BEFORE UPDATE OF status ON projects
  FOR EACH ROW
  EXECUTE FUNCTION track_status_change();

-- Add secondary owner support
ALTER TABLE objectives
ADD COLUMN IF NOT EXISTS secondary_owner_id uuid REFERENCES users(id);

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS secondary_owner_id uuid REFERENCES users(id);

-- Create view for ownership tracking
CREATE OR REPLACE VIEW entity_ownership AS
SELECT
  entity_type,
  id as entity_id,
  department_id,
  owner_id as primary_owner_id,
  NULL::uuid as secondary_owner_id,
  created_at,
  updated_at
FROM unified_progress_tracking;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_objectives_parent ON objectives(parent_objective_id);
CREATE INDEX IF NOT EXISTS idx_projects_objective ON projects(objective_id);
CREATE INDEX IF NOT EXISTS idx_objectives_department ON objectives(department_id);
CREATE INDEX IF NOT EXISTS idx_projects_department ON projects(department_id);