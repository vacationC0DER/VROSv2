/*
  # Create KPIs table and policies

  1. New Tables
    - `kpis`
      - `id` (uuid, primary key)
      - `title` (text)
      - `value` (text)
      - `target` (text)
      - `trend` (text)
      - `change` (text)
      - `category` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `kpis` table
    - Add policy for authenticated users to read KPIs
    - Add policy for admins to modify KPIs
*/

CREATE TABLE IF NOT EXISTS kpis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  value text NOT NULL,
  target text NOT NULL,
  trend text CHECK (trend IN ('up', 'down', 'neutral')) NOT NULL,
  change text NOT NULL,
  category text CHECK (category IN ('financial', 'customer', 'internal', 'enablers')) NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read KPIs
CREATE POLICY "KPIs are readable by authenticated users"
  ON kpis FOR SELECT
  TO authenticated
  USING (true);

-- Allow admins to modify KPIs
CREATE POLICY "Admins can modify KPIs"
  ON kpis FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Update trigger for updated_at
CREATE TRIGGER update_kpis_updated_at
  BEFORE UPDATE ON kpis
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();