-- Only create functions and triggers since table already exists

-- Function to calculate hot score (Reddit-like algorithm)
CREATE OR REPLACE FUNCTION calculate_hot_score(
  ups integer,
  downs integer,
  created_at timestamptz
) RETURNS float AS $$
DECLARE
  score integer := ups - downs;
  order_of_magnitude integer;
  seconds_since_epoch float;
  sign integer;
BEGIN
  IF score > 0 THEN
    sign := 1;
  ELSIF score < 0 THEN
    sign := -1;
  ELSE
    sign := 0;
  END IF;

  order_of_magnitude := CASE
    WHEN abs(score) = 0 THEN 0
    ELSE floor(ln(abs(score)) / ln(10))
  END;

  seconds_since_epoch := EXTRACT(EPOCH FROM created_at - '1970-01-01 00:00:00'::timestamptz);
  
  RETURN round(
    sign * order_of_magnitude + seconds_since_epoch / 45000,
    7
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to update post scores
CREATE OR REPLACE FUNCTION update_post_scores()
RETURNS TRIGGER AS $$
DECLARE
  target_post_id uuid;
BEGIN
  -- Get the target post id based on operation type
  target_post_id := CASE TG_OP
    WHEN 'DELETE' THEN OLD.target_id
    ELSE NEW.target_id
  END;

  -- Update post scores
  UPDATE forum_posts
  SET
    upvotes = (
      SELECT COUNT(*) FROM forum_votes 
      WHERE target_type = 'post' 
      AND target_id = target_post_id 
      AND vote_type = 'up'
    ),
    downvotes = (
      SELECT COUNT(*) FROM forum_votes 
      WHERE target_type = 'post' 
      AND target_id = target_post_id 
      AND vote_type = 'down'
    ),
    score = (
      SELECT COUNT(*) FILTER (WHERE vote_type = 'up') - COUNT(*) FILTER (WHERE vote_type = 'down')
      FROM forum_votes 
      WHERE target_type = 'post' 
      AND target_id = target_post_id
    ),
    hot_score = calculate_hot_score(
      (SELECT COUNT(*) FROM forum_votes WHERE target_type = 'post' AND target_id = target_post_id AND vote_type = 'up'),
      (SELECT COUNT(*) FROM forum_votes WHERE target_type = 'post' AND target_id = target_post_id AND vote_type = 'down'),
      created_at
    )
  WHERE id = target_post_id;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update comment scores
CREATE OR REPLACE FUNCTION update_comment_scores()
RETURNS TRIGGER AS $$
DECLARE
  target_comment_id uuid;
BEGIN
  -- Get the target comment id based on operation type
  target_comment_id := CASE TG_OP
    WHEN 'DELETE' THEN OLD.target_id
    ELSE NEW.target_id
  END;

  -- Update comment scores
  UPDATE forum_comments
  SET
    upvotes = (
      SELECT COUNT(*) FROM forum_votes 
      WHERE target_type = 'comment' 
      AND target_id = target_comment_id 
      AND vote_type = 'up'
    ),
    downvotes = (
      SELECT COUNT(*) FROM forum_votes 
      WHERE target_type = 'comment' 
      AND target_id = target_comment_id 
      AND vote_type = 'down'
    ),
    score = (
      SELECT COUNT(*) FILTER (WHERE vote_type = 'up') - COUNT(*) FILTER (WHERE vote_type = 'down')
      FROM forum_votes 
      WHERE target_type = 'comment' 
      AND target_id = target_comment_id
    )
  WHERE id = target_comment_id;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_post_votes_insert ON forum_votes;
DROP TRIGGER IF EXISTS update_post_votes_delete ON forum_votes;
DROP TRIGGER IF EXISTS update_comment_votes_insert ON forum_votes;
DROP TRIGGER IF EXISTS update_comment_votes_delete ON forum_votes;

-- Create triggers for vote updates
CREATE TRIGGER update_post_votes_insert
  AFTER INSERT ON forum_votes
  FOR EACH ROW
  WHEN (NEW.target_type = 'post')
  EXECUTE FUNCTION update_post_scores();

CREATE TRIGGER update_post_votes_delete
  AFTER DELETE ON forum_votes
  FOR EACH ROW
  WHEN (OLD.target_type = 'post')
  EXECUTE FUNCTION update_post_scores();

CREATE TRIGGER update_comment_votes_insert
  AFTER INSERT ON forum_votes
  FOR EACH ROW
  WHEN (NEW.target_type = 'comment')
  EXECUTE FUNCTION update_comment_scores();

CREATE TRIGGER update_comment_votes_delete
  AFTER DELETE ON forum_votes
  FOR EACH ROW
  WHEN (OLD.target_type = 'comment')
  EXECUTE FUNCTION update_comment_scores();