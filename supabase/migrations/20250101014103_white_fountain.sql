-- Create core objectives categories
CREATE TYPE objective_category AS ENUM (
  'financial',
  'customer',
  'process',
  'enabler'
);

-- Create core objectives table
CREATE TABLE IF NOT EXISTS core_objectives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category objective_category NOT NULL,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create core objectives view
CREATE OR REPLACE VIEW core_objectives_with_progress AS
SELECT 
  co.*,
  COUNT(o.id) as total_objectives,
  ROUND(AVG(o.progress)) as overall_progress,
  COUNT(o.id) FILTER (WHERE o.status = 'completed') as completed_objectives
FROM core_objectives co
LEFT JOIN objectives o ON o.parent_objective_id = co.id
GROUP BY co.id;

-- Insert core objectives
INSERT INTO core_objectives (title, description, category, order_index) VALUES
  (
    'Drive Sustainable Growth',
    'Achieve sustainable financial growth through revenue expansion and operational efficiency',
    'financial',
    1
  ),
  (
    'Maximize Owner Success',
    'Ensure property owner satisfaction and portfolio growth',
    'customer',
    2
  ),
  (
    'Deliver Exceptional Guest Experience',
    'Create memorable stays and maintain high guest satisfaction',
    'customer',
    3
  ),
  (
    'Optimize Operations',
    'Streamline processes and enhance operational efficiency',
    'process',
    4
  ),
  (
    'Build Team Excellence',
    'Develop high-performing teams and foster innovation',
    'enabler',
    5
  );

-- Create function to calculate objective progress
CREATE OR REPLACE FUNCTION calculate_objective_progress(objective_id uuid)
RETURNS numeric AS $$
DECLARE
  total_weight numeric := 0;
  weighted_progress numeric := 0;
BEGIN
  -- Calculate progress from child objectives
  SELECT 
    COALESCE(SUM(CASE WHEN o.progress IS NOT NULL THEN 1 ELSE 0 END), 0),
    COALESCE(SUM(o.progress), 0)
  INTO total_weight, weighted_progress
  FROM objectives o
  WHERE o.parent_objective_id = objective_id;

  -- Calculate progress from projects
  SELECT 
    total_weight + COALESCE(SUM(CASE WHEN p.progress IS NOT NULL THEN 1 ELSE 0 END), 0),
    weighted_progress + COALESCE(SUM(p.progress), 0)
  INTO total_weight, weighted_progress
  FROM projects p
  WHERE p.objective_id = objective_id;

  -- Return average progress
  RETURN CASE 
    WHEN total_weight > 0 THEN ROUND(weighted_progress / total_weight)
    ELSE 0
  END;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update parent objective progress
CREATE OR REPLACE FUNCTION update_parent_objective_progress()
RETURNS trigger AS $$
BEGIN
  IF TG_TABLE_NAME = 'objectives' AND NEW.parent_objective_id IS NOT NULL THEN
    UPDATE objectives
    SET progress = calculate_objective_progress(NEW.parent_objective_id)
    WHERE id = NEW.parent_objective_id;
  END IF;

  IF TG_TABLE_NAME = 'projects' AND NEW.objective_id IS NOT NULL THEN
    UPDATE objectives
    SET progress = calculate_objective_progress(NEW.objective_id)
    WHERE id = NEW.objective_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for progress updates
DROP TRIGGER IF EXISTS update_objective_parent_progress ON objectives;
CREATE TRIGGER update_objective_parent_progress
  AFTER INSERT OR UPDATE OF progress ON objectives
  FOR EACH ROW
  EXECUTE FUNCTION update_parent_objective_progress();

DROP TRIGGER IF EXISTS update_project_objective_progress ON projects;
CREATE TRIGGER update_project_objective_progress
  AFTER INSERT OR UPDATE OF progress ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_parent_objective_progress();