/*
  # Add Core Objectives and Categories

  1. Changes
    - Add enabler categories to objectives check constraint
    - Insert core parent objectives
    - Link existing objectives to core objectives
*/

-- First modify the category check constraint to include enabler categories
ALTER TABLE objectives
DROP CONSTRAINT IF EXISTS objectives_category_check;

ALTER TABLE objectives
ADD CONSTRAINT objectives_category_check 
CHECK (category IN ('F1', 'F2', 'C1', 'C2', 'P1', 'P2', 'E1', 'E2'));

-- Insert core parent objectives
INSERT INTO objectives (
  id,
  title,
  description,
  category,
  department_id,
  owner_id,
  progress,
  status,
  created_at
) VALUES
  (
    'c0000000-0000-4000-a000-000000000001',
    'Financial Excellence',
    'Drive sustainable financial growth and operational efficiency',
    'F1',
    '77777777-7777-4777-7777-777777777777',
    'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb',
    0,
    'in_progress',
    NOW()
  ),
  (
    'c0000000-0000-4000-a000-000000000002',
    'Customer Success',
    'Deliver exceptional customer experiences and value',
    'C1',
    '55555555-5555-4555-5555-555555555555',
    '99999999-9999-4999-9999-999999999999',
    0,
    'in_progress',
    NOW()
  ),
  (
    'c0000000-0000-4000-a000-000000000003',
    'Internal Process Excellence',
    'Optimize operations and internal processes',
    'P1',
    '44444444-4444-4444-4444-444444444444',
    '88888888-8888-4888-8888-888888888888',
    0,
    'in_progress',
    NOW()
  ),
  (
    'c0000000-0000-4000-a000-000000000004',
    'Enablers & Innovation',
    'Build capabilities and drive innovation',
    'E1',
    '66666666-6666-4666-6666-666666666666',
    'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
    0,
    'in_progress',
    NOW()
  );

-- Update existing objectives to link to core objectives
UPDATE objectives 
SET parent_objective_id = 'c0000000-0000-4000-a000-000000000001'
WHERE category LIKE 'F%'
  AND id NOT IN (
    'c0000000-0000-4000-a000-000000000001',
    'c0000000-0000-4000-a000-000000000002',
    'c0000000-0000-4000-a000-000000000003',
    'c0000000-0000-4000-a000-000000000004'
  );

UPDATE objectives 
SET parent_objective_id = 'c0000000-0000-4000-a000-000000000002'
WHERE category LIKE 'C%'
  AND id NOT IN (
    'c0000000-0000-4000-a000-000000000001',
    'c0000000-0000-4000-a000-000000000002',
    'c0000000-0000-4000-a000-000000000003',
    'c0000000-0000-4000-a000-000000000004'
  );

UPDATE objectives 
SET parent_objective_id = 'c0000000-0000-4000-a000-000000000003'
WHERE category LIKE 'P%'
  AND id NOT IN (
    'c0000000-0000-4000-a000-000000000001',
    'c0000000-0000-4000-a000-000000000002',
    'c0000000-0000-4000-a000-000000000003',
    'c0000000-0000-4000-a000-000000000004'
  );

UPDATE objectives 
SET parent_objective_id = 'c0000000-0000-4000-a000-000000000004'
WHERE category LIKE 'E%'
  AND id NOT IN (
    'c0000000-0000-4000-a000-000000000001',
    'c0000000-0000-4000-a000-000000000002',
    'c0000000-0000-4000-a000-000000000003',
    'c0000000-0000-4000-a000-000000000004'
  );