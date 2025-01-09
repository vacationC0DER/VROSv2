-- Create categories table
CREATE TABLE knowledge_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  slug text UNIQUE NOT NULL,
  icon text,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create posts table
CREATE TABLE knowledge_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category_id uuid REFERENCES knowledge_categories(id) NOT NULL,
  author_id uuid REFERENCES users(id) NOT NULL,
  status text CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  is_pinned boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create comments table
CREATE TABLE knowledge_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES knowledge_posts(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES users(id) NOT NULL,
  content text NOT NULL,
  parent_id uuid REFERENCES knowledge_comments(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create attachments table
CREATE TABLE knowledge_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES knowledge_posts(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  uploaded_by uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE knowledge_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_attachments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can read categories"
  ON knowledge_categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON knowledge_categories FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Anyone can read published posts"
  ON knowledge_posts FOR SELECT
  TO authenticated
  USING (status = 'published' OR author_id = auth.uid());

CREATE POLICY "Admins can manage all posts"
  ON knowledge_posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Authors can manage their posts"
  ON knowledge_posts FOR ALL
  TO authenticated
  USING (author_id = auth.uid());

-- Comments policies
CREATE POLICY "Anyone can read comments"
  ON knowledge_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON knowledge_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments"
  ON knowledge_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

-- Attachments policies
CREATE POLICY "Anyone can read attachments"
  ON knowledge_attachments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage attachments"
  ON knowledge_attachments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );