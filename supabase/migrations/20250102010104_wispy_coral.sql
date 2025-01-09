-- Rename tables
ALTER TABLE knowledge_categories RENAME TO forum_categories;
ALTER TABLE knowledge_posts RENAME TO forum_posts;
ALTER TABLE knowledge_comments RENAME TO forum_comments;
ALTER TABLE knowledge_attachments RENAME TO forum_attachments;

-- Update foreign key constraints
ALTER TABLE forum_posts 
  DROP CONSTRAINT knowledge_posts_category_id_fkey,
  ADD CONSTRAINT forum_posts_category_id_fkey 
    FOREIGN KEY (category_id) REFERENCES forum_categories(id);

ALTER TABLE forum_comments
  DROP CONSTRAINT knowledge_comments_post_id_fkey,
  ADD CONSTRAINT forum_comments_post_id_fkey
    FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE;

ALTER TABLE forum_attachments
  DROP CONSTRAINT knowledge_attachments_post_id_fkey,
  ADD CONSTRAINT forum_attachments_post_id_fkey
    FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE;

-- Update RLS policies
DROP POLICY IF EXISTS "Anyone can read categories" ON forum_categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON forum_categories;
DROP POLICY IF EXISTS "Anyone can read published posts" ON forum_posts;
DROP POLICY IF EXISTS "Admins can manage all posts" ON forum_posts;
DROP POLICY IF EXISTS "Authors can manage their posts" ON forum_posts;
DROP POLICY IF EXISTS "Anyone can read comments" ON forum_comments;
DROP POLICY IF EXISTS "Authenticated users can create comments" ON forum_comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON forum_comments;
DROP POLICY IF EXISTS "Anyone can read attachments" ON forum_attachments;
DROP POLICY IF EXISTS "Admins can manage attachments" ON forum_attachments;

-- Recreate policies with new names
CREATE POLICY "Anyone can read categories"
  ON forum_categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON forum_categories FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Anyone can read published posts"
  ON forum_posts FOR SELECT
  TO authenticated
  USING (status = 'published' OR author_id = auth.uid());

CREATE POLICY "Admins can manage all posts"
  ON forum_posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Authors can manage their posts"
  ON forum_posts FOR ALL
  TO authenticated
  USING (author_id = auth.uid());

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
  USING (auth.uid() = author_id);

CREATE POLICY "Anyone can read attachments"
  ON forum_attachments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage attachments"
  ON forum_attachments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );