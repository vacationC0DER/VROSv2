-- Create knowledge base tables
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

CREATE TABLE knowledge_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category_id uuid REFERENCES knowledge_categories(id) NOT NULL,
  author_id uuid REFERENCES users(id) NOT NULL,
  status text CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  is_featured boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE knowledge_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES knowledge_articles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  uploaded_by uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE knowledge_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_attachments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can read categories"
  ON knowledge_categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read published articles"
  ON knowledge_articles FOR SELECT
  TO authenticated
  USING (status = 'published' OR author_id = auth.uid());

CREATE POLICY "Authors can manage their articles"
  ON knowledge_articles FOR ALL
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Anyone can read attachments"
  ON knowledge_attachments FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial categories
INSERT INTO knowledge_categories (name, description, slug, icon, position) VALUES
  ('Getting Started', 'Essential guides and onboarding materials', 'getting-started', '🚀', 1),
  ('Policies & Procedures', 'Company policies and standard procedures', 'policies', '📋', 2),
  ('Tools & Systems', 'Guides for internal tools and systems', 'tools', '🛠️', 3),
  ('Best Practices', 'Recommended practices and guidelines', 'best-practices', '⭐', 4),
  ('Training', 'Training materials and resources', 'training', '📚', 5),
  ('Templates', 'Standard templates and forms', 'templates', '📝', 6);