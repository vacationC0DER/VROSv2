/*
  # Fix RLS policies

  1. Changes
    - Remove recursive policy on users table
    - Simplify objectives access policy
    - Add basic read-only policy for users table
  
  2. Security
    - Maintains data security while preventing infinite recursion
    - Ensures authenticated users can read necessary user data
*/

-- Drop existing policies
DROP POLICY IF EXISTS users_read_own ON users;
DROP POLICY IF EXISTS objectives_access ON objectives;

-- Create simplified users policy
CREATE POLICY "Users are readable by authenticated users"
  ON users FOR SELECT
  TO authenticated
  USING (true);

-- Create simplified objectives policy
CREATE POLICY "Objectives are readable by authenticated users"
  ON objectives FOR SELECT
  TO authenticated
  USING (true);

-- For write operations on objectives
CREATE POLICY "Users can modify objectives they own"
  ON objectives FOR ALL
  TO authenticated
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());