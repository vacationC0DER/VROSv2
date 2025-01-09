-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own data requests" ON data_requests;
DROP POLICY IF EXISTS "Users can create data requests" ON data_requests;

-- Create simplified policies
CREATE POLICY "Authenticated users can read data requests"
  ON data_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create data requests"
  ON data_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Add communication logging capabilities
CREATE TABLE IF NOT EXISTS crm_communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid REFERENCES crm_deals(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('email', 'phone', 'sms')),
  subject text,
  content text NOT NULL,
  direction text NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  status text NOT NULL CHECK (status IN ('draft', 'sent', 'received', 'failed')),
  sent_at timestamptz,
  created_by uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_communications_deal ON crm_communications(deal_id);
CREATE INDEX IF NOT EXISTS idx_communications_type ON crm_communications(type);
CREATE INDEX IF NOT EXISTS idx_communications_created ON crm_communications(created_at);

-- Enable RLS
ALTER TABLE crm_communications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for communications
CREATE POLICY "Authenticated users can read communications"
  ON crm_communications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create communications"
  ON crm_communications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Create function to update last contact timestamp
CREATE OR REPLACE FUNCTION update_deal_last_contact()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE crm_deals
  SET last_contact_at = NEW.sent_at
  WHERE id = NEW.deal_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for last contact updates
DROP TRIGGER IF EXISTS update_deal_last_contact_trigger ON crm_communications;
CREATE TRIGGER update_deal_last_contact_trigger
  AFTER INSERT ON crm_communications
  FOR EACH ROW
  EXECUTE FUNCTION update_deal_last_contact();