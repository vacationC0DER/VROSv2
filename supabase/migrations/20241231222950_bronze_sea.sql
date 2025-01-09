/*
  # Update KPIs for Grand Welcome

  1. Changes
    - Remove existing KPIs
    - Add new KPIs specific to Grand Welcome:
      - Number of signed units
      - Number of managed units
      - Guest reviews
      - Owner retention rate
*/

-- First remove existing KPIs
DELETE FROM kpis;

-- Insert new KPIs
INSERT INTO kpis (
  id, title, value, target, trend, change, category, description
) VALUES
  (
    gen_random_uuid(),
    'Signed Units',
    '250',
    '300',
    'up',
    '+15 this month',
    'financial',
    'Total number of units signed with Grand Welcome'
  ),
  (
    gen_random_uuid(),
    'Managed Units',
    '225',
    '275',
    'up',
    '+12 this month',
    'financial',
    'Total number of units under active management'
  ),
  (
    gen_random_uuid(),
    'Guest Review Score',
    '4.6/5',
    '4.8/5',
    'up',
    '+0.2 from last quarter',
    'customer',
    'Average guest review rating across all properties'
  ),
  (
    gen_random_uuid(),
    'Owner Retention Rate',
    '92%',
    '95%',
    'neutral',
    'No change from last month',
    'customer',
    'Percentage of property owners retained annually'
  );