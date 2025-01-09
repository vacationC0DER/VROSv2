/*
  # Department Tasks and Team Management
  
  1. New Tables
    - department_tasks: Tracks tasks assigned to department members
    
  2. Sample Data
    - Sample users for each department
    - Department heads assignment
    - Sample tasks
    
  3. Statistics
    - Member count function
    - Department statistics view
*/

-- Insert sample users with various roles
INSERT INTO users (id, email, first_name, last_name, role, department_id) VALUES
  (gen_random_uuid(), 'sarah.tech@example.com', 'Sarah', 'Tech', 'director', 'd3a8f283-4e58-4d9c-bd7c-38d9b0f3e7b5'),
  (gen_random_uuid(), 'mike.sales@example.com', 'Mike', 'Sales', 'manager', 'd1b6d105-6056-4c8e-8902-87e5a5845633'),
  (gen_random_uuid(), 'lisa.marketing@example.com', 'Lisa', 'Marketing', 'manager', 'd2f7e194-3d57-4cfb-ac6b-27c8b0e4d6a4'),
  (gen_random_uuid(), 'james.dev@example.com', 'James', 'Developer', 'user', 'd3a8f283-4e58-4d9c-bd7c-38d9b0f3e7b5'),
  (gen_random_uuid(), 'emma.sales@example.com', 'Emma', 'Sales', 'user', 'd1b6d105-6056-4c8e-8902-87e5a5845633');

-- Update department heads using a more reliable method
DO $$
DECLARE
  tech_director_id uuid;
  sales_manager_id uuid;
  marketing_manager_id uuid;
BEGIN
  -- Get the IDs of our department heads
  SELECT id INTO tech_director_id FROM users WHERE email = 'sarah.tech@example.com';
  SELECT id INTO sales_manager_id FROM users WHERE email = 'mike.sales@example.com';
  SELECT id INTO marketing_manager_id FROM users WHERE email = 'lisa.marketing@example.com';

  -- Update departments with their heads
  UPDATE departments SET head_user_id = tech_director_id
  WHERE id = 'd3a8f283-4e58-4d9c-bd7c-38d9b0f3e7b5';

  UPDATE departments SET head_user_id = sales_manager_id
  WHERE id = 'd1b6d105-6056-4c8e-8902-87e5a5845633';

  UPDATE departments SET head_user_id = marketing_manager_id
  WHERE id = 'd2f7e194-3d57-4cfb-ac6b-27c8b0e4d6a4';
END $$;

-- Create tasks table
CREATE TABLE IF NOT EXISTS department_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  status text CHECK (status IN ('pending', 'completed')) DEFAULT 'pending',
  due_date timestamptz NOT NULL,
  assignee_id uuid REFERENCES users(id) NOT NULL,
  department_id uuid REFERENCES departments(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on tasks
ALTER TABLE department_tasks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tasks
CREATE POLICY "Tasks are viewable by department members"
  ON department_tasks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.department_id = department_tasks.department_id
    )
  );

CREATE POLICY "Department members can create tasks"
  ON department_tasks FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.department_id = department_tasks.department_id
    )
  );

CREATE POLICY "Task assignees and department heads can update tasks"
  ON department_tasks FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = assignee_id OR
    EXISTS (
      SELECT 1 FROM departments
      WHERE departments.id = department_tasks.department_id
      AND departments.head_user_id = auth.uid()
    )
  );

-- Insert sample tasks using a more reliable method
DO $$
DECLARE
  sales_manager_id uuid;
  marketing_manager_id uuid;
  tech_director_id uuid;
  sales_user_id uuid;
BEGIN
  -- Get user IDs
  SELECT id INTO sales_manager_id FROM users WHERE email = 'mike.sales@example.com';
  SELECT id INTO marketing_manager_id FROM users WHERE email = 'lisa.marketing@example.com';
  SELECT id INTO tech_director_id FROM users WHERE email = 'sarah.tech@example.com';
  SELECT id INTO sales_user_id FROM users WHERE email = 'emma.sales@example.com';

  -- Insert tasks
  INSERT INTO department_tasks (title, description, status, due_date, assignee_id, department_id) VALUES
    (
      'Complete Q1 Sales Report',
      'Analyze and compile Q1 sales performance data',
      'pending',
      NOW() + INTERVAL '5 days',
      sales_manager_id,
      'd1b6d105-6056-4c8e-8902-87e5a5845633'
    ),
    (
      'Launch Marketing Campaign',
      'Execute new product marketing campaign',
      'pending',
      NOW() + INTERVAL '10 days',
      marketing_manager_id,
      'd2f7e194-3d57-4cfb-ac6b-27c8b0e4d6a4'
    ),
    (
      'System Architecture Review',
      'Review and update system architecture documentation',
      'completed',
      NOW() + INTERVAL '3 days',
      tech_director_id,
      'd3a8f283-4e58-4d9c-bd7c-38d9b0f3e7b5'
    ),
    (
      'Client Presentation',
      'Prepare and deliver client presentation',
      'pending',
      NOW() + INTERVAL '7 days',
      sales_user_id,
      'd1b6d105-6056-4c8e-8902-87e5a5845633'
    );
END $$;

-- Create function to count department members
CREATE OR REPLACE FUNCTION get_department_member_count(department_id uuid)
RETURNS integer AS $$
  SELECT COUNT(*)::integer
  FROM users
  WHERE department_id = $1;
$$ LANGUAGE sql STABLE;

-- Create view for department statistics
CREATE OR REPLACE VIEW department_statistics AS
SELECT 
  d.id as department_id,
  d.name as department_name,
  get_department_member_count(d.id) as member_count,
  COUNT(dt.id) as total_tasks,
  COUNT(dt.id) FILTER (WHERE dt.status = 'completed') as completed_tasks,
  ROUND(
    COUNT(dt.id) FILTER (WHERE dt.status = 'completed')::numeric / 
    NULLIF(COUNT(dt.id), 0)::numeric * 100
  ) as completion_rate
FROM departments d
LEFT JOIN department_tasks dt ON d.id = dt.department_id
GROUP BY d.id, d.name;