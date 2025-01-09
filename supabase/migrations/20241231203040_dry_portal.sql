/*
  # Add sample data for objectives and related tables

  1. Sample Data
    - Departments with positions
    - Users with roles and department assignments
    - Objectives with various statuses and categories
*/

-- Insert sample departments
INSERT INTO departments (id, name, position) VALUES
  ('d1b6d105-6056-4c8e-8902-87e5a5845633', 'Sales', 1),
  ('d2f7e194-3d57-4cfb-ac6b-27c8b0e4d6a4', 'Marketing', 2),
  ('d3a8f283-4e58-4d9c-bd7c-38d9b0f3e7b5', 'Engineering', 3)
ON CONFLICT (id) DO NOTHING;

-- Insert sample users
INSERT INTO users (id, email, first_name, last_name, role, department_id) VALUES
  ('11111111-1111-4111-1111-111111111111', 'john@example.com', 'John', 'Doe', 'manager', 'd1b6d105-6056-4c8e-8902-87e5a5845633'),
  ('22222222-2222-4222-2222-222222222222', 'jane@example.com', 'Jane', 'Smith', 'director', 'd2f7e194-3d57-4cfb-ac6b-27c8b0e4d6a4'),
  ('33333333-3333-4333-3333-333333333333', 'bob@example.com', 'Bob', 'Wilson', 'manager', 'd3a8f283-4e58-4d9c-bd7c-38d9b0f3e7b5')
ON CONFLICT (id) DO NOTHING;

-- Insert sample objectives
INSERT INTO objectives (
  id, title, description, category, department_id, owner_id,
  progress, status, created_at
) VALUES
  (
    '44444444-4444-4444-4444-444444444444',
    'Increase Revenue by 25%',
    'Drive revenue growth through new market expansion and increased customer retention',
    'F1',
    'd1b6d105-6056-4c8e-8902-87e5a5845633',
    '11111111-1111-4111-1111-111111111111',
    75,
    'in_progress',
    NOW() - INTERVAL '30 days'
  ),
  (
    '55555555-5555-4555-5555-555555555555',
    'Improve Customer Satisfaction',
    'Achieve 95% customer satisfaction score through enhanced support and product quality',
    'C1',
    'd2f7e194-3d57-4cfb-ac6b-27c8b0e4d6a4',
    '22222222-2222-4222-2222-222222222222',
    100,
    'completed',
    NOW() - INTERVAL '60 days'
  ),
  (
    '66666666-6666-4666-6666-666666666666',
    'Launch Mobile App',
    'Develop and launch mobile application for improved customer engagement',
    'P1',
    'd3a8f283-4e58-4d9c-bd7c-38d9b0f3e7b5',
    '33333333-3333-4333-3333-333333333333',
    30,
    'at_risk',
    NOW() - INTERVAL '45 days'
  ),
  (
    '77777777-7777-4777-7777-777777777777',
    'Optimize Operating Costs',
    'Reduce operational expenses by 15% through process improvements',
    'F2',
    'd1b6d105-6056-4c8e-8902-87e5a5845633',
    '11111111-1111-4111-1111-111111111111',
    0,
    'not_started',
    NOW() - INTERVAL '15 days'
  )
ON CONFLICT (id) DO NOTHING;