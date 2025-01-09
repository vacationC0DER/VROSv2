-- Create tables for data requests
CREATE TABLE data_request_types (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text
);

-- Insert request types
INSERT INTO data_request_types (id, name, description) VALUES
  ('property', 'Property Data', 'Property details, history, and market analysis'),
  ('sales', 'Sales Data', 'Historical sales data and comparables');

-- Create search methods table
CREATE TABLE search_methods (
  id text PRIMARY KEY,
  name text NOT NULL
);

-- Insert search methods
INSERT INTO search_methods (id, name) VALUES
  ('zipcode', 'ZIP Code'),
  ('address', 'Full Address'),
  ('city-state-zip', 'City, State, ZIP');

-- Create data requests table
CREATE TABLE data_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  request_type text REFERENCES data_request_types(id) NOT NULL,
  search_method text REFERENCES search_methods(id) NOT NULL,
  zip_code text,
  address text,
  city text,
  state text,
  city_zip text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  response_data jsonb,
  error_message text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  
  -- Ensure at least one search criteria is provided
  CONSTRAINT valid_search_criteria CHECK (
    CASE search_method
      WHEN 'zipcode' THEN zip_code IS NOT NULL
      WHEN 'address' THEN address IS NOT NULL
      WHEN 'city-state-zip' THEN city IS NOT NULL AND state IS NOT NULL AND city_zip IS NOT NULL
    END
  )
);

-- Create indexes
CREATE INDEX idx_data_requests_user ON data_requests(user_id);
CREATE INDEX idx_data_requests_type ON data_requests(request_type);
CREATE INDEX idx_data_requests_status ON data_requests(status);
CREATE INDEX idx_data_requests_created ON data_requests(created_at);

-- Enable RLS
ALTER TABLE data_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own data requests"
  ON data_requests
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create data requests"
  ON data_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create function to validate ZIP code format
CREATE OR REPLACE FUNCTION validate_zip_code(zip text)
RETURNS boolean AS $$
BEGIN
  RETURN zip ~ '^\d{5}(-\d{4})?$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create function to validate data request
CREATE OR REPLACE FUNCTION validate_data_request()
RETURNS trigger AS $$
BEGIN
  -- Validate ZIP code if provided
  IF NEW.zip_code IS NOT NULL AND NOT validate_zip_code(NEW.zip_code) THEN
    RAISE EXCEPTION 'Invalid ZIP code format';
  END IF;
  
  -- Validate city ZIP if provided
  IF NEW.city_zip IS NOT NULL AND NOT validate_zip_code(NEW.city_zip) THEN
    RAISE EXCEPTION 'Invalid city ZIP code format';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for data request validation
CREATE TRIGGER validate_data_request_trigger
  BEFORE INSERT OR UPDATE ON data_requests
  FOR EACH ROW
  EXECUTE FUNCTION validate_data_request();