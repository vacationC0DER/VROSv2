-- Create communication types enum
CREATE TYPE communication_type AS ENUM ('email', 'phone', 'sms');

-- Create communications table
CREATE TABLE crm_communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid REFERENCES crm_deals(id) ON DELETE CASCADE NOT NULL,
  type communication_type NOT NULL,
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
CREATE INDEX idx_communications_deal ON crm_communications(deal_id);
CREATE INDEX idx_communications_type ON crm_communications(type);
CREATE INDEX idx_communications_created ON crm_communications(created_at);

-- Enable RLS
ALTER TABLE crm_communications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view deal communications"
  ON crm_communications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM crm_deals
      WHERE id = crm_communications.deal_id
      AND (created_by = auth.uid() OR assigned_to = auth.uid())
    )
  );

CREATE POLICY "Users can create communications"
  ON crm_communications FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM crm_deals
      WHERE id = crm_communications.deal_id
      AND (created_by = auth.uid() OR assigned_to = auth.uid())
    )
  );

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
CREATE TRIGGER update_deal_last_contact_trigger
  AFTER INSERT ON crm_communications
  FOR EACH ROW
  EXECUTE FUNCTION update_deal_last_contact();