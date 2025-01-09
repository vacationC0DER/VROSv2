-- Create schedule_tasks table
CREATE TABLE schedule_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  day text NOT NULL CHECK (day IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')),
  completed boolean DEFAULT false,
  recurring boolean DEFAULT false,
  user_id uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE schedule_tasks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own tasks"
  ON schedule_tasks
  USING (auth.uid() = user_id);

-- Create update trigger for updated_at
CREATE TRIGGER update_schedule_tasks_updated_at
  BEFORE UPDATE ON schedule_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert default tasks for demo
INSERT INTO schedule_tasks (title, day, user_id, recurring)
SELECT
  title,
  day,
  user_id,
  true
FROM (
  VALUES
    ('Sales Plan', 'monday', (SELECT id FROM users LIMIT 1)),
    ('Identify 40 prospects', 'monday', (SELECT id FROM users LIMIT 1)),
    ('Review follow up', 'monday', (SELECT id FROM users LIMIT 1)),
    ('Field Operations meeting', 'tuesday', (SELECT id FROM users LIMIT 1)),
    ('Company KPI review', 'wednesday', (SELECT id FROM users LIMIT 1)),
    ('Check in review', 'thursday', (SELECT id FROM users LIMIT 1)),
    ('Finance Close out', 'friday', (SELECT id FROM users LIMIT 1))
) AS default_tasks(title, day, user_id);