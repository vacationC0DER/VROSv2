-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view deal communications" ON crm_communications;
DROP POLICY IF EXISTS "Users can create communications" ON crm_communications;
DROP POLICY IF EXISTS "Authenticated users can read communications" ON crm_communications;
DROP POLICY IF EXISTS "Users can create communications" ON crm_communications;

-- Create new simplified policies
CREATE POLICY "Authenticated users can read communications"
  ON crm_communications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM crm_deals
      WHERE id = crm_communications.deal_id
      AND (created_by = auth.uid() OR assigned_to = auth.uid())
    )
  );

CREATE POLICY "Authenticated users can create communications"
  ON crm_communications FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM crm_deals
      WHERE id = crm_communications.deal_id
      AND (created_by = auth.uid() OR assigned_to = auth.uid())
    )
  );

-- Create function to update last contact timestamp if it doesn't exist
CREATE OR REPLACE FUNCTION update_deal_last_contact()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE crm_deals
  SET last_contact_at = NEW.sent_at
  WHERE id = NEW.deal_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate trigger
DROP TRIGGER IF EXISTS update_deal_last_contact_trigger ON crm_communications;
CREATE TRIGGER update_deal_last_contact_trigger
  AFTER INSERT ON crm_communications
  FOR EACH ROW
  EXECUTE FUNCTION update_deal_last_contact();