-- Enable ltree extension
CREATE EXTENSION IF NOT EXISTS ltree;

-- Add parent_id to forum_comments for nested structure
ALTER TABLE forum_comments
ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES forum_comments(id);

-- Add path column for efficient tree traversal
ALTER TABLE forum_comments
ADD COLUMN IF NOT EXISTS path ltree;

-- Create index for path queries
CREATE INDEX IF NOT EXISTS forum_comments_path_idx ON forum_comments USING gist(path);

-- Create function to update comment path
CREATE OR REPLACE FUNCTION update_comment_path()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.parent_id IS NULL THEN
    -- Top-level comment
    NEW.path = text2ltree(NEW.id::text);
  ELSE
    -- Nested comment
    SELECT path || text2ltree(NEW.id::text)
    INTO NEW.path
    FROM forum_comments
    WHERE id = NEW.parent_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for path updates
CREATE TRIGGER update_comment_path_trigger
  BEFORE INSERT ON forum_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_path();

-- Create function to get comment replies count
CREATE OR REPLACE FUNCTION get_comment_replies_count(comment_id uuid)
RETURNS integer AS $$
  SELECT COUNT(*)::integer
  FROM forum_comments
  WHERE path <@ text2ltree(comment_id::text)
  AND id != comment_id;
$$ LANGUAGE sql STABLE;

-- Create notifications table for replies
CREATE TABLE IF NOT EXISTS forum_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  type text NOT NULL CHECK (type IN ('reply', 'mention', 'vote')),
  content text NOT NULL,
  post_id uuid REFERENCES forum_posts(id),
  comment_id uuid REFERENCES forum_comments(id),
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE forum_notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications"
  ON forum_notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create function to handle reply notifications
CREATE OR REPLACE FUNCTION notify_comment_reply()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create notification if this is a reply
  IF NEW.parent_id IS NOT NULL THEN
    INSERT INTO forum_notifications (
      user_id,
      type,
      content,
      post_id,
      comment_id
    )
    SELECT
      c.author_id,
      'reply',
      format('New reply to your comment on "%s"', p.title),
      p.id,
      NEW.id
    FROM forum_comments c
    JOIN forum_posts p ON c.post_id = p.id
    WHERE c.id = NEW.parent_id
    AND c.author_id != NEW.author_id;  -- Don't notify if replying to own comment
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for reply notifications
CREATE TRIGGER notify_comment_reply_trigger
  AFTER INSERT ON forum_comments
  FOR EACH ROW
  EXECUTE FUNCTION notify_comment_reply();

-- Create view for threaded comments
CREATE OR REPLACE VIEW forum_threaded_comments AS
WITH RECURSIVE comment_tree AS (
  -- Base case: top-level comments
  SELECT
    c.*,
    0 as depth,
    array[c.created_at] as sort_path
  FROM forum_comments c
  WHERE parent_id IS NULL

  UNION ALL

  -- Recursive case: replies
  SELECT
    c.*,
    p.depth + 1,
    p.sort_path || c.created_at
  FROM forum_comments c
  JOIN comment_tree p ON c.parent_id = p.id
)
SELECT
  ct.*,
  get_comment_replies_count(ct.id) as replies_count,
  u.first_name,
  u.last_name,
  fp.karma_points as author_karma
FROM comment_tree ct
JOIN users u ON ct.author_id = u.id
LEFT JOIN forum_profiles fp ON u.id = fp.id
ORDER BY sort_path;