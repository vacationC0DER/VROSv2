/*
  # Initial Business Operating System Schema

  1. New Tables
    - `users`
      - Core user information and authentication
      - Role-based access control
      - Department assignment
    
    - `departments`
      - Department hierarchy and structure
      - Position ordering
      - Leadership tracking
    
    - `objectives`
      - OKR objectives with hierarchy
      - Category and ownership tracking
      - Progress monitoring
    
    - `key_results`
      - Measurable outcomes for objectives
      - Metric tracking
      - Progress history
    
    - `projects`
      - Initiative tracking
      - Team assignments
      - Timeline management
    
    - `quarterly_targets`
      - KR target tracking by quarter
      - Progress monitoring
    
    - `department_support`
      - Cross-department collaboration tracking
      - Support level assignment

  2. Security
    - Enable RLS on all tables
    - Policies for role-based access
    - Department-level data isolation
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'director', 'manager', 'user')),
  department_id uuid,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  position INTEGER NOT NULL CHECK (position BETWEEN 1 AND 9),
  head_user_id uuid REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(position)
);

-- Add foreign key to users after departments table exists
ALTER TABLE users ADD CONSTRAINT fk_department
  FOREIGN KEY (department_id) REFERENCES departments(id);

-- Objectives table
CREATE TABLE IF NOT EXISTS objectives (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('C1', 'C2', 'F1', 'F2', 'P1', 'P2')),
  department_id uuid REFERENCES departments(id) NOT NULL,
  owner_id uuid REFERENCES users(id) NOT NULL,
  parent_objective_id uuid REFERENCES objectives(id),
  progress DECIMAL CHECK (progress BETWEEN 0 AND 100),
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed', 'at_risk')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Key Results table
CREATE TABLE IF NOT EXISTS key_results (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  objective_id uuid REFERENCES objectives(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  owner_id uuid REFERENCES users(id) NOT NULL,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('number', 'percentage', 'currency', 'boolean')),
  target_value DECIMAL NOT NULL,
  current_value DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  objective_id uuid REFERENCES objectives(id) NOT NULL,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed', 'blocked')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  progress DECIMAL CHECK (progress BETWEEN 0 AND 100) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Members junction table
CREATE TABLE IF NOT EXISTS project_members (
  project_id uuid REFERENCES projects(id) NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  role TEXT CHECK (role IN ('lead', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (project_id, user_id)
);

-- Quarterly Targets table
CREATE TABLE IF NOT EXISTS quarterly_targets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  key_result_id uuid REFERENCES key_results(id) NOT NULL,
  year INTEGER NOT NULL,
  quarter INTEGER CHECK (quarter BETWEEN 1 AND 4) NOT NULL,
  target_value DECIMAL NOT NULL,
  actual_value DECIMAL DEFAULT 0,
  status TEXT CHECK (status IN ('on_track', 'at_risk', 'behind')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(key_result_id, year, quarter)
);

-- Department Support table
CREATE TABLE IF NOT EXISTS department_support (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  key_result_id uuid REFERENCES key_results(id) NOT NULL,
  department_id uuid REFERENCES departments(id) NOT NULL,
  support_level TEXT CHECK (support_level IN ('primary', 'secondary')) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(key_result_id, department_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE quarterly_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE department_support ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own data and admins can read all
CREATE POLICY users_read_own ON users
  FOR SELECT USING (
    auth.uid() = id OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Department data visible to members and admins
CREATE POLICY department_access ON departments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND 
      (department_id = departments.id OR role = 'admin')
    )
  );

-- Objectives visible to department members and admins
CREATE POLICY objectives_access ON objectives
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND 
      (department_id = objectives.department_id OR role = 'admin')
    )
  );

-- Key Results visible to related users
CREATE POLICY key_results_access ON key_results
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users u
      JOIN objectives o ON key_results.objective_id = o.id
      WHERE u.id = auth.uid() AND 
      (u.department_id = o.department_id OR u.role = 'admin')
    )
  );

-- Project access for team members and admins
CREATE POLICY projects_access ON projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM project_members pm
      JOIN users u ON pm.user_id = u.id
      WHERE projects.id = pm.project_id AND 
      (u.id = auth.uid() OR u.role = 'admin')
    )
  );

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers to all tables
CREATE TRIGGER update_users_timestamp
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_departments_timestamp
  BEFORE UPDATE ON departments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_objectives_timestamp
  BEFORE UPDATE ON objectives
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_key_results_timestamp
  BEFORE UPDATE ON key_results
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_timestamp
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();