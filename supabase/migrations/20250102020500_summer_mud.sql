-- Add voting columns to forum posts and comments
ALTER TABLE forum_posts
ADD COLUMN IF NOT EXISTS upvotes integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS downvotes integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS score integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS hot_score float DEFAULT 0;

ALTER TABLE forum_comments
ADD COLUMN IF NOT EXISTS upvotes integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS downvotes integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS score integer DEFAULT 0;

-- Create votes table if it doesn't exist
CREATE TABLE IF NOT EXISTS forum_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  target_type text NOT NULL CHECK (target_type IN ('post', 'comment')),
  target_id uuid NOT NULL,
  vote_type text NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, target_type, target_id)
);

-- Enable RLS if not already enabled
ALTER TABLE forum_votes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can read votes" ON forum_votes;
DROP POLICY IF EXISTS "Users can create votes" ON forum_votes;
DROP POLICY IF EXISTS "Users can delete their own votes" ON forum_votes;

-- Create new RLS policies
CREATE POLICY "Authenticated users can read votes"
  ON forum_votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create votes"
  ON forum_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes"
  ON forum_votes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update karma points
CREATE OR REPLACE FUNCTION update_user_karma()
RETURNS TRIGGER AS $$
DECLARE
  content_author_id uuid;
  karma_change integer;
BEGIN
  -- Get content author ID
  IF NEW.target_type = 'post' THEN
    SELECT author_id INTO content_author_id
    FROM forum_posts WHERE id = NEW.target_id;
  ELSE
    SELECT author_id INTO content_author_id
    FROM forum_comments WHERE id = NEW.target_id;
  END IF;

  -- Calculate karma change
  karma_change := CASE NEW.vote_type
    WHEN 'up' THEN 1
    WHEN 'down' THEN -1
  END;

  -- Update user's karma
  UPDATE forum_profiles
  SET karma_points = karma_points + karma_change
  WHERE id = content_author_id;

  -- Log karma change
  INSERT INTO forum_karma_history (
    user_id,
    amount,
    reason,
    source_type,
    source_id
  ) VALUES (
    content_author_id,
    karma_change,
    CASE 
      WHEN NEW.target_type = 'post' AND NEW.vote_type = 'up' THEN 'Post upvoted'
      WHEN NEW.target_type = 'post' AND NEW.vote_type = 'down' THEN 'Post downvoted'
      WHEN NEW.target_type = 'comment' AND NEW.vote_type = 'up' THEN 'Comment upvoted'
      ELSE 'Comment downvoted'
    END,
    NEW.target_type,
    NEW.target_id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for karma updates
DROP TRIGGER IF EXISTS update_karma_on_vote ON forum_votes;
CREATE TRIGGER update_karma_on_vote
  AFTER INSERT ON forum_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_user_karma();

-- Create function to update vote counts
CREATE OR REPLACE FUNCTION update_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.target_type = 'post' THEN
    UPDATE forum_posts
    SET 
      upvotes = (
        SELECT COUNT(*) FROM forum_votes 
        WHERE target_type = 'post' 
        AND target_id = NEW.target_id 
        AND vote_type = 'up'
      ),
      downvotes = (
        SELECT COUNT(*) FROM forum_votes 
        WHERE target_type = 'post' 
        AND target_id = NEW.target_id 
        AND vote_type = 'down'
      ),
      score = (
        SELECT COUNT(*) FILTER (WHERE vote_type = 'up') - COUNT(*) FILTER (WHERE vote_type = 'down')
        FROM forum_votes 
        WHERE target_type = 'post' 
        AND target_id = NEW.target_id
      )
    WHERE id = NEW.target_id;
  ELSE
    UPDATE forum_comments
    SET 
      upvotes = (
        SELECT COUNT(*) FROM forum_votes 
        WHERE target_type = 'comment' 
        AND target_id = NEW.target_id 
        AND vote_type = 'up'
      ),
      downvotes = (
        SELECT COUNT(*) FROM forum_votes 
        WHERE target_type = 'comment' 
        AND target_id = NEW.target_id 
        AND vote_type = 'down'
      ),
      score = (
        SELECT COUNT(*) FILTER (WHERE vote_type = 'up') - COUNT(*) FILTER (WHERE vote_type = 'down')
        FROM forum_votes 
        WHERE target_type = 'comment' 
        AND target_id = NEW.target_id
      )
    WHERE id = NEW.target_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for vote count updates
DROP TRIGGER IF EXISTS update_vote_counts_on_vote ON forum_votes;
CREATE TRIGGER update_vote_counts_on_vote
  AFTER INSERT OR DELETE ON forum_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_vote_counts();