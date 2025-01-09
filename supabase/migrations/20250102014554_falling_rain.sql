-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can read categories" ON forum_categories;
DROP POLICY IF EXISTS "Anyone can read published posts" ON forum_posts;
DROP POLICY IF EXISTS "Authors can create posts" ON forum_posts;
DROP POLICY IF EXISTS "Authors can update their posts" ON forum_posts;
DROP POLICY IF EXISTS "Anyone can read comments" ON forum_comments;
DROP POLICY IF EXISTS "Authenticated users can create comments" ON forum_comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON forum_comments;
DROP POLICY IF EXISTS "Anyone can read votes" ON forum_votes;
DROP POLICY IF EXISTS "Users can create votes" ON forum_votes;
DROP POLICY IF EXISTS "Users can delete their own votes" ON forum_votes;

-- Create forum categories table
CREATE TABLE IF NOT EXISTS forum_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  slug text UNIQUE NOT NULL,
  icon text,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create forum posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category_id uuid REFERENCES forum_categories(id) NOT NULL,
  author_id uuid REFERENCES users(id) NOT NULL,
  status text CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  is_pinned boolean DEFAULT false,
  view_count integer DEFAULT 0,
  upvotes integer DEFAULT 0,
  downvotes integer DEFAULT 0,
  score integer DEFAULT 0,
  hot_score float DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create forum comments table
CREATE TABLE IF NOT EXISTS forum_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES forum_posts(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES users(id) NOT NULL,
  content text NOT NULL,
  upvotes integer DEFAULT 0,
  downvotes integer DEFAULT 0,
  score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create votes tracking table
CREATE TABLE IF NOT EXISTS forum_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  target_type text NOT NULL CHECK (target_type IN ('post', 'comment')),
  target_id uuid NOT NULL,
  vote_type text NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, target_type, target_id)
);

-- Enable RLS
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_votes ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Anyone can read categories"
  ON forum_categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read published posts"
  ON forum_posts FOR SELECT
  TO authenticated
  USING (status = 'published' OR author_id = auth.uid());

CREATE POLICY "Authors can create posts"
  ON forum_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their posts"
  ON forum_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Anyone can read comments"
  ON forum_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON forum_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments"
  ON forum_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Anyone can read votes"
  ON forum_votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create votes"
  ON forum_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes"
  ON forum_votes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);