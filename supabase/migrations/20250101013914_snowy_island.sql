-- Add owner fields to projects table
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS owner_id uuid REFERENCES users(id),
ADD COLUMN IF NOT EXISTS secondary_owner_id uuid REFERENCES users(id);

-- Create explicit foreign key names for project ownership
ALTER TABLE projects
DROP CONSTRAINT IF EXISTS projects_owner_id_fkey,
DROP CONSTRAINT IF EXISTS projects_secondary_owner_id_fkey;

ALTER TABLE projects
ADD CONSTRAINT projects_owner_id_fkey 
  FOREIGN KEY (owner_id) 
  REFERENCES users(id),
ADD CONSTRAINT projects_secondary_owner_id_fkey 
  FOREIGN KEY (secondary_owner_id) 
  REFERENCES users(id);

-- Update project store query view
CREATE OR REPLACE VIEW project_details AS
SELECT 
  p.id,
  p.title,
  p.description,
  p.objective_id,
  p.core_objective_id,
  p.department_id,
  p.owner_id,
  p.secondary_owner_id,
  p.status,
  p.start_date,
  p.end_date,
  p.progress,
  p.created_at,
  p.updated_at,
  o.title as objective_title,
  o.category as objective_category,
  co.title as core_objective_title,
  d.name as department_name,
  po.first_name as owner_first_name,
  po.last_name as owner_last_name,
  so.first_name as secondary_owner_first_name,
  so.last_name as secondary_owner_last_name
FROM projects p
LEFT JOIN objectives o ON p.objective_id = o.id
LEFT JOIN objectives co ON p.core_objective_id = co.id
LEFT JOIN departments d ON p.department_id = d.id
LEFT JOIN users po ON p.owner_id = po.id
LEFT JOIN users so ON p.secondary_owner_id = so.id;