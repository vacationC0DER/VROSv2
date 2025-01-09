-- Insert sample schedule tasks
INSERT INTO schedule_tasks (
  title,
  description,
  day,
  recurring,
  user_id,
  completed
)
SELECT
  title,
  description,
  day,
  recurring,
  (SELECT id FROM users WHERE email = 'admin@grandwelcome.com' LIMIT 1),
  completed
FROM (
  VALUES
    -- Monday Tasks
    (
      'Team Stand-up',
      'Weekly team sync and progress updates',
      'monday',
      true,
      false
    ),
    (
      'Property Inspections Review',
      'Review scheduled property inspections and maintenance reports',
      'monday',
      true,
      false
    ),
    (
      'Revenue Analysis',
      'Weekly revenue performance analysis and forecasting',
      'monday',
      true,
      false
    ),

    -- Tuesday Tasks
    (
      'Owner Relations Meeting',
      'Weekly meeting with property owners',
      'tuesday',
      true,
      false
    ),
    (
      'Marketing Campaign Review',
      'Review and adjust ongoing marketing campaigns',
      'tuesday',
      true,
      false
    ),
    (
      'Staff Training Session',
      'Weekly training and development session',
      'tuesday',
      true,
      false
    ),

    -- Wednesday Tasks
    (
      'Operations Review',
      'Mid-week operations and logistics review',
      'wednesday',
      true,
      false
    ),
    (
      'Guest Experience Meeting',
      'Review guest feedback and improvement initiatives',
      'wednesday',
      true,
      false
    ),
    (
      'Vendor Coordination',
      'Coordinate with maintenance and service vendors',
      'wednesday',
      true,
      false
    ),

    -- Thursday Tasks
    (
      'Quality Assurance Check',
      'Property quality standards review',
      'thursday',
      true,
      false
    ),
    (
      'Team Development',
      'One-on-one meetings with team members',
      'thursday',
      true,
      false
    ),
    (
      'Budget Review',
      'Weekly budget and expense review',
      'thursday',
      true,
      false
    ),

    -- Friday Tasks
    (
      'Week-End Preparation',
      'Ensure all properties are ready for weekend guests',
      'friday',
      true,
      false
    ),
    (
      'Performance Reports',
      'Generate and review weekly performance reports',
      'friday',
      true,
      false
    ),
    (
      'Team Wrap-up',
      'End of week team sync and planning',
      'friday',
      true,
      false
    ),

    -- Non-recurring Tasks
    (
      'Quarterly Strategy Review',
      'Review and update strategic initiatives',
      'monday',
      false,
      false
    ),
    (
      'New Property Onboarding',
      'Complete onboarding process for new vacation rental',
      'wednesday',
      false,
      false
    ),
    (
      'System Update Training',
      'Team training on new software features',
      'thursday',
      false,
      false
    ),
    (
      'Annual Planning Session',
      'Year-end review and next year planning',
      'friday',
      false,
      false
    ),
    (
      'Market Analysis Presentation',
      'Present findings from recent market analysis',
      'tuesday',
      false,
      false
    )
) AS sample_tasks(title, description, day, recurring, completed);

-- Add some completed tasks
UPDATE schedule_tasks
SET completed = true
WHERE id IN (
  SELECT id FROM schedule_tasks
  ORDER BY RANDOM()
  LIMIT 5
);