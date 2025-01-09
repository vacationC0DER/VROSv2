/*
  # Update departments and sample data
  
  1. Changes
    - Update existing departments to new names
    - Insert new departments with proper UUIDs
    - Add sample users and objectives
*/

-- First update existing departments to new names
UPDATE departments 
SET name = 'Sales'
WHERE position = 1;

UPDATE departments 
SET name = 'Marketing'
WHERE position = 2;

UPDATE departments 
SET name = 'Onboarding'
WHERE position = 3;

-- Insert remaining departments if they don't exist
INSERT INTO departments (id, name, position)
SELECT 
  '44444444-4444-4444-4444-444444444444', 'Field Operations', 4
WHERE NOT EXISTS (SELECT 1 FROM departments WHERE position = 4);

INSERT INTO departments (id, name, position)
SELECT 
  '55555555-5555-4555-5555-555555555555', 'Guest Services', 5
WHERE NOT EXISTS (SELECT 1 FROM departments WHERE position = 5);

INSERT INTO departments (id, name, position)
SELECT 
  '66666666-6666-4666-6666-666666666666', 'Human Resources', 6
WHERE NOT EXISTS (SELECT 1 FROM departments WHERE position = 6);

INSERT INTO departments (id, name, position)
SELECT 
  '77777777-7777-4777-7777-777777777777', 'Finance', 7
WHERE NOT EXISTS (SELECT 1 FROM departments WHERE position = 7);

-- Insert sample users for new departments
INSERT INTO users (id, email, first_name, last_name, role, department_id) VALUES
  ('88888888-8888-4888-8888-888888888888', 'operations.lead@example.com', 'Jordan', 'Taylor', 'manager', '44444444-4444-4444-4444-444444444444'),
  ('99999999-9999-4999-9999-999999999999', 'guest.lead@example.com', 'Pat', 'Morgan', 'manager', '55555555-5555-4555-5555-555555555555'),
  ('aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa', 'hr.lead@example.com', 'Sam', 'Rivera', 'manager', '66666666-6666-4666-6666-666666666666'),
  ('bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb', 'finance.lead@example.com', 'Jamie', 'Wong', 'manager', '77777777-7777-4777-7777-777777777777')
ON CONFLICT (id) DO NOTHING;

-- Insert sample objectives for new departments
INSERT INTO objectives (
  id, title, description, category, department_id, owner_id,
  progress, status, created_at
) VALUES
  (
    'cccccccc-cccc-4ccc-cccc-cccccccccccc',
    'Field Team Efficiency',
    'Implement new field service management system',
    'P2',
    '44444444-4444-4444-4444-444444444444',
    '88888888-8888-4888-8888-888888888888',
    25,
    'in_progress',
    NOW() - INTERVAL '20 days'
  ),
  (
    'dddddddd-dddd-4ddd-dddd-dddddddddddd',
    'Guest Satisfaction Score',
    'Achieve and maintain 95% guest satisfaction score',
    'C2',
    '55555555-5555-4555-5555-555555555555',
    '99999999-9999-4999-9999-999999999999',
    70,
    'in_progress',
    NOW() - INTERVAL '40 days'
  ),
  (
    'eeeeeeee-eeee-4eee-eeee-eeeeeeeeeeee',
    'Employee Engagement',
    'Improve employee engagement scores by 25%',
    'P1',
    '66666666-6666-4666-6666-666666666666',
    'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
    40,
    'in_progress',
    NOW() - INTERVAL '35 days'
  ),
  (
    'ffffffff-ffff-4fff-ffff-ffffffffffff',
    'Cost Optimization',
    'Reduce operational costs by 15% through efficiency improvements',
    'F2',
    '77777777-7777-4777-7777-777777777777',
    'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb',
    30,
    'in_progress',
    NOW() - INTERVAL '25 days'
  )
ON CONFLICT (id) DO NOTHING;