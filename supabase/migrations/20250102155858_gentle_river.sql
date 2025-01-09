-- Insert sample schedule tasks
INSERT INTO schedule_tasks (
  title,
  description,
  day,
  recurring,
  user_id
)
SELECT
  title,
  description,
  day,
  true,
  (SELECT id FROM users WHERE email = 'admin@grandwelcome.com' LIMIT 1)
FROM (
  VALUES
    (
      'Sales Plan Review',
      'Review and update weekly sales strategy and targets',
      'monday',
      true
    ),
    (
      'Identify 40 Prospects',
      'Research and identify new potential property owners',
      'monday',
      true
    ),
    (
      'Follow-up Review',
      'Review pending follow-ups and owner communications',
      'monday',
      true
    ),
    (
      'Field Operations Meeting',
      'Weekly sync with field operations team',
      'tuesday',
      true
    ),
    (
      'Property Inspections Review',
      'Review scheduled property inspections and maintenance',
      'tuesday',
      true
    ),
    (
      'Company KPI Review',
      'Review and analyze company-wide performance metrics',
      'wednesday',
      true
    ),
    (
      'Department Updates',
      'Collect and review department progress updates',
      'wednesday',
      true
    ),
    (
      'Team Check-in Review',
      'One-on-one meetings with team leads',
      'thursday',
      true
    ),
    (
      'Guest Satisfaction Review',
      'Review guest feedback and satisfaction metrics',
      'thursday',
      true
    ),
    (
      'Finance Close Out',
      'Weekly financial review and reconciliation',
      'friday',
      true
    ),
    (
      'Weekly Report Preparation',
      'Prepare end-of-week reports and next week planning',
      'friday',
      true
    )
) AS sample_tasks(title, description, day, recurring)
ON CONFLICT (id) DO NOTHING;