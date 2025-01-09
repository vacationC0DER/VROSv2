-- Create CRM tables
CREATE TABLE crm_deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_address text NOT NULL,
  owner_name text NOT NULL,
  owner_email text NOT NULL,
  owner_phone text NOT NULL,
  annual_revenue numeric(12,2) NOT NULL,
  property_type text CHECK (property_type IN ('vacation_home', 'condo', 'apartment', 'villa')),
  bedrooms integer,
  bathrooms integer,
  stage text NOT NULL CHECK (stage IN ('lead', 'contacted', 'meeting', 'proposal', 'negotiation', 'closed')),
  notes text,
  last_contact_at timestamptz,
  assigned_to uuid REFERENCES users(id),
  created_by uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create activities table for tracking interactions
CREATE TABLE crm_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid REFERENCES crm_deals(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('note', 'email', 'call', 'meeting', 'task')),
  title text NOT NULL,
  description text,
  due_date timestamptz,
  completed_at timestamptz,
  created_by uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tasks table for deal-related tasks
CREATE TABLE crm_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid REFERENCES crm_deals(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  due_date timestamptz NOT NULL,
  priority text CHECK (priority IN ('low', 'medium', 'high')),
  status text NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  assigned_to uuid REFERENCES users(id),
  created_by uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create documents table for deal-related files
CREATE TABLE crm_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid REFERENCES crm_deals(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  uploaded_by uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE crm_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Authenticated users can read deals"
  ON crm_deals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create deals"
  ON crm_deals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update assigned deals"
  ON crm_deals FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = assigned_to OR
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Activities policies
CREATE POLICY "Users can read deal activities"
  ON crm_activities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create activities"
  ON crm_activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Tasks policies
CREATE POLICY "Users can read deal tasks"
  ON crm_tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create and manage tasks"
  ON crm_tasks FOR ALL
  TO authenticated
  USING (
    auth.uid() = assigned_to OR
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Documents policies
CREATE POLICY "Users can read deal documents"
  ON crm_documents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can upload documents"
  ON crm_documents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

-- Create updated_at triggers
CREATE TRIGGER update_crm_deals_updated_at
  BEFORE UPDATE ON crm_deals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_crm_activities_updated_at
  BEFORE UPDATE ON crm_activities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_crm_tasks_updated_at
  BEFORE UPDATE ON crm_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert sample data
INSERT INTO crm_deals (
  property_address,
  owner_name,
  owner_email,
  owner_phone,
  annual_revenue,
  property_type,
  bedrooms,
  bathrooms,
  stage,
  last_contact_at,
  created_by
) VALUES
  (
    '123 Mountain View Dr, Aspen, CO',
    'John Smith',
    'john@example.com',
    '(555) 123-4567',
    175000,
    'vacation_home',
    3,
    2,
    'lead',
    now() - interval '2 days',
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com')
  ),
  (
    '456 Lake Shore Rd, Lake Tahoe, CA',
    'Sarah Johnson',
    'sarah@example.com',
    '(555) 234-5678',
    225000,
    'villa',
    4,
    3,
    'contacted',
    now() - interval '1 day',
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com')
  ),
  (
    '789 Luxury Ave, Vail, CO',
    'Michael Brown',
    'michael@example.com',
    '(555) 345-6789',
    195000,
    'condo',
    2,
    2,
    'meeting',
    now() - interval '3 days',
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com')
  );

-- Insert sample activities
INSERT INTO crm_activities (
  deal_id,
  type,
  title,
  description,
  created_by
) 
SELECT 
  d.id,
  'call',
  'Initial Contact',
  'Discussed property management services and pricing',
  (SELECT id FROM users WHERE email = 'admin@grandwelcome.com')
FROM crm_deals d
WHERE d.stage = 'lead'
LIMIT 1;

-- Insert sample tasks
INSERT INTO crm_tasks (
  deal_id,
  title,
  description,
  due_date,
  priority,
  status,
  created_by
)
SELECT
  d.id,
  'Schedule Property Inspection',
  'Coordinate with owner for initial property inspection',
  now() + interval '5 days',
  'high',
  'pending',
  (SELECT id FROM users WHERE email = 'admin@grandwelcome.com')
FROM crm_deals d
WHERE d.stage = 'contacted'
LIMIT 1;