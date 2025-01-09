-- Add threading support to forum_comments
ALTER TABLE forum_comments
ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES forum_comments(id),
ADD COLUMN IF NOT EXISTS depth integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS thread_order bigint DEFAULT extract(epoch from now());

-- Create function to update comment metadata
CREATE OR REPLACE FUNCTION update_comment_metadata()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.parent_id IS NULL THEN
    -- Top-level comment
    NEW.depth = 0;
  ELSE
    -- Nested comment
    SELECT depth + 1
    INTO NEW.depth
    FROM forum_comments
    WHERE id = NEW.parent_id;
  END IF;
  
  -- Set thread order based on creation time
  NEW.thread_order = extract(epoch from NEW.created_at);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for metadata updates
DROP TRIGGER IF EXISTS update_comment_metadata_trigger ON forum_comments;
CREATE TRIGGER update_comment_metadata_trigger
  BEFORE INSERT ON forum_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_metadata();

-- Create function to get comment replies count
CREATE OR REPLACE FUNCTION get_comment_replies_count(comment_id uuid)
RETURNS integer AS $$
  SELECT COUNT(*)::integer
  FROM forum_comments
  WHERE parent_id = comment_id;
$$ LANGUAGE sql STABLE;

-- Create notifications table for replies if it doesn't exist
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

-- Enable RLS on notifications if not already enabled
ALTER TABLE forum_notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing notification policy if it exists
DROP POLICY IF EXISTS "Users can view their own notifications" ON forum_notifications;

-- Create RLS policy for notifications
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
DROP TRIGGER IF EXISTS notify_comment_reply_trigger ON forum_comments;
CREATE TRIGGER notify_comment_reply_trigger
  AFTER INSERT ON forum_comments
  FOR EACH ROW
  EXECUTE FUNCTION notify_comment_reply();