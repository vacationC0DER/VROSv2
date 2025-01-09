-- Create enum for search method types
CREATE TYPE search_method AS ENUM ('zipcode', 'address', 'city-state-zip');

-- Create property data requests table
CREATE TABLE property_data_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  search_method search_method NOT NULL,
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

-- Create sales data requests table
CREATE TABLE sales_data_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  search_method search_method NOT NULL,
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

-- Enable RLS
ALTER TABLE property_data_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_data_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own property data requests"
  ON property_data_requests
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create property data requests"
  ON property_data_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own sales data requests"
  ON sales_data_requests
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create sales data requests"
  ON sales_data_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create indexes for better query performance
CREATE INDEX idx_property_requests_user ON property_data_requests(user_id);
CREATE INDEX idx_property_requests_status ON property_data_requests(status);
CREATE INDEX idx_property_requests_created ON property_data_requests(created_at);

CREATE INDEX idx_sales_requests_user ON sales_data_requests(user_id);
CREATE INDEX idx_sales_requests_status ON sales_data_requests(status);
CREATE INDEX idx_sales_requests_created ON sales_data_requests(created_at);

-- Create function to validate ZIP code format
CREATE OR REPLACE FUNCTION validate_zip_code(zip text)
RETURNS boolean AS $$
BEGIN
  RETURN zip ~ '^\d{5}(-\d{4})?$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Add ZIP code validation triggers
CREATE OR REPLACE FUNCTION validate_zip_codes()
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

CREATE TRIGGER validate_property_zip_codes
  BEFORE INSERT OR UPDATE ON property_data_requests
  FOR EACH ROW
  EXECUTE FUNCTION validate_zip_codes();

CREATE TRIGGER validate_sales_zip_codes
  BEFORE INSERT OR UPDATE ON sales_data_requests
  FOR EACH ROW
  EXECUTE FUNCTION validate_zip_codes();