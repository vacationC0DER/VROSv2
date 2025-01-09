/*
  # Add sample hospitality data

  1. New Data
    - Hospitality-focused objectives
    - Related KPIs
    - Connected projects
  2. Categories
    - Guest Experience (C1)
    - Revenue Management (F1)
    - Process Improvement (P1)
    - Market Growth (F2)
*/

DO $$
DECLARE
  obj_guest_exp_id UUID := gen_random_uuid();
  obj_revenue_id UUID := gen_random_uuid();
  obj_checkin_id UUID := gen_random_uuid();
  obj_market_id UUID := gen_random_uuid();
  proj_mobile_id UUID := gen_random_uuid();
  proj_market_id UUID := geen_random_uuid();
  proj_guest_id UUID := gen_random_uuid();
BEGIN

-- Insert sample objectives
INSERT INTO objectives (
  id, title, description, category, department_id, owner_id, progress, status, created_at
) VALUES
  (
    obj_guest_exp_id,
    'Enhance Guest Experience Score',
    'Improve overall guest satisfaction and experience ratings across all properties',
    'C1',
    '55555555-5555-4555-5555-555555555555',
    '99999999-9999-4999-9999-999999999999',
    65,
    'in_progress',
    NOW() - INTERVAL '30 days'
  ),
  (
    obj_revenue_id,
    'Optimize Revenue Per Available Room',
    'Increase RevPAR through strategic pricing and occupancy management',
    'F1',
    '44444444-4444-4444-4444-444444444444',
    '88888888-8888-4888-8888-888888888888',
    45,
    'in_progress',
    NOW() - INTERVAL '45 days'
  ),
  (
    obj_checkin_id,
    'Streamline Check-in Process',
    'Reduce average check-in time to under 5 minutes',
    'P1',
    '55555555-5555-4555-5555-555555555555',
    '99999999-9999-4999-9999-999999999999',
    80,
    'in_progress',
    NOW() - INTERVAL '60 days'
  ),
  (
    obj_market_id,
    'Market Expansion',
    'Enter three new metropolitan markets',
    'F2',
    '44444444-4444-4444-4444-444444444444',
    '88888888-8888-4888-8888-888888888888',
    30,
    'in_progress',
    NOW() - INTERVAL '20 days'
  );

-- Insert related KPIs
INSERT INTO kpis (
  id, title, value, target, trend, change, category, description
) VALUES
  (
    gen_random_uuid(),
    'Guest Satisfaction Score',
    '4.5/5',
    '4.8/5',
    'up',
    '+0.2 from last month',
    'customer',
    'Average guest satisfaction rating across all properties'
  ),
  (
    gen_random_uuid(),
    'RevPAR',
    '$120',
    '$150',
    'up',
    '+15% YoY',
    'financial',
    'Revenue per available room'
  ),
  (
    gen_random_uuid(),
    'Average Check-in Time',
    '6.5 min',
    '5 min',
    'down',
    '-1.5 min from Q3',
    'internal',
    'Average time to complete guest check-in process'
  ),
  (
    gen_random_uuid(),
    'New Markets Entered',
    '1',
    '3',
    'up',
    '+1 this quarter',
    'enablers',
    'Number of new metropolitan markets entered'
  );

-- Insert related projects
INSERT INTO projects (
  id, title, description, objective_id, department_id, status, start_date, end_date, progress
) VALUES
  (
    proj_mobile_id,
    'Mobile Check-in Implementation',
    'Deploy mobile check-in capability across all properties',
    obj_checkin_id,
    '55555555-5555-4555-5555-555555555555',
    'in_progress',
    '2024-01-01',
    '2024-03-31',
    75
  ),
  (
    proj_market_id,
    'Market Analysis Study',
    'Comprehensive analysis of potential new markets',
    obj_market_id,
    '44444444-4444-4444-4444-444444444444',
    'in_progress',
    '2024-02-01',
    '2024-04-30',
    40
  ),
  (
    proj_guest_id,
    'Guest Experience Enhancement Program',
    'Training and process improvements for guest satisfaction',
    obj_guest_exp_id,
    '55555555-5555-4555-5555-555555555555',
    'in_progress',
    '2024-01-15',
    '2024-03-15',
    60
  );

-- Add project members
INSERT INTO project_members (project_id, user_id, role) VALUES
  (proj_mobile_id, '99999999-9999-4999-9999-999999999999', 'lead'),
  (proj_market_id, '88888888-8888-4888-8888-888888888888', 'lead'),
  (proj_guest_id, '99999999-9999-4999-9999-999999999999', 'lead');

END $$;