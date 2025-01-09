/*
  # Fix Departments Data

  1. Changes
    - Re-insert departments with correct UUIDs
    - Ensure all department data is properly populated
*/

-- Re-insert departments with fixed UUIDs
INSERT INTO departments (id, name, position)
VALUES
  ('d1b6d105-6056-4c8e-8902-87e5a5845633', 'Sales', 1),
  ('d2f7e194-3d57-4cfb-ac6b-27c8b0e4d6a4', 'Marketing', 2),
  ('d3a8f283-4e58-4d9c-bd7c-38d9b0f3e7b5', 'Onboarding', 3),
  ('44444444-4444-4444-4444-444444444444', 'Field Operations', 4),
  ('55555555-5555-4555-5555-555555555555', 'Guest Services', 5),
  ('66666666-6666-4666-6666-666666666666', 'Human Resources', 6),
  ('77777777-7777-4777-7777-777777777777', 'Finance', 7)
ON CONFLICT (id) DO UPDATE 
SET 
  name = EXCLUDED.name,
  position = EXCLUDED.position;