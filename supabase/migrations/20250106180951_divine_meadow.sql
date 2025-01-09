-- Create LMS tables
CREATE TABLE lms_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE lms_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category uuid REFERENCES lms_categories(id),
  duration integer NOT NULL,
  scorm_url text NOT NULL,
  thumbnail_url text,
  author_id uuid REFERENCES users(id) NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE lms_course_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  course_id uuid REFERENCES lms_courses(id) NOT NULL,
  progress integer DEFAULT 0,
  completed boolean DEFAULT false,
  last_accessed timestamptz DEFAULT now(),
  completion_date timestamptz,
  scorm_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE lms_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms_course_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can read categories"
  ON lms_categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read published courses"
  ON lms_courses FOR SELECT
  TO authenticated
  USING (published OR author_id = auth.uid());

CREATE POLICY "Users can create courses"
  ON lms_courses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own courses"
  ON lms_courses FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Users can manage their own progress"
  ON lms_course_progress
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert default categories
INSERT INTO lms_categories (name, slug, description) VALUES
  ('Onboarding', 'onboarding', 'New employee onboarding materials'),
  ('Sales Training', 'sales', 'Sales techniques and best practices'),
  ('Operations', 'operations', 'Operational procedures and guidelines'),
  ('Guest Services', 'guest-services', 'Guest service standards and protocols'),
  ('Safety & Compliance', 'safety', 'Safety procedures and compliance training');