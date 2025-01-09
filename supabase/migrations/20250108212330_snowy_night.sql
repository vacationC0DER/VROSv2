-- Create basic data requests table
CREATE TABLE IF NOT EXISTS data_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  request_type text NOT NULL CHECK (request_type IN ('property', 'sales')),
  search_method text NOT NULL CHECK (search_method IN ('zipcode', 'address', 'city-state-zip')),
  search_params jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  response_data jsonb,
  error_message text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_data_requests_user ON data_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_data_requests_type ON data_requests(request_type);
CREATE INDEX IF NOT EXISTS idx_data_requests_status ON data_requests(status);

-- Enable RLS
ALTER TABLE data_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own data requests"
  ON data_requests FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create data requests"
  ON data_requests FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());