-- Create function to award karma points for votes
CREATE OR REPLACE FUNCTION award_vote_karma()
RETURNS TRIGGER AS $$
BEGIN
  -- Only award karma on insert
  IF TG_OP = 'INSERT' THEN
    -- Award karma to content author
    PERFORM award_karma_points(
      CASE 
        WHEN NEW.target_type = 'post' THEN
          (SELECT author_id FROM forum_posts WHERE id = NEW.target_id)
        ELSE
          (SELECT author_id FROM forum_comments WHERE id = NEW.target_id)
      END,
      CASE NEW.vote_type
        WHEN 'up' THEN 1
        ELSE -1
      END,
      CASE 
        WHEN NEW.target_type = 'post' AND NEW.vote_type = 'up' THEN 'Post upvoted'
        WHEN NEW.target_type = 'post' AND NEW.vote_type = 'down' THEN 'Post downvoted'
        WHEN NEW.target_type = 'comment' AND NEW.vote_type = 'up' THEN 'Comment upvoted'
        ELSE 'Comment downvoted'
      END,
      NEW.target_type,
      NEW.target_id
    );
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for karma awards on votes
DROP TRIGGER IF EXISTS award_vote_karma_trigger ON forum_votes;
CREATE TRIGGER award_vote_karma_trigger
  AFTER INSERT ON forum_votes
  FOR EACH ROW
  EXECUTE FUNCTION award_vote_karma();

-- Create function to award karma for new content
CREATE OR REPLACE FUNCTION award_content_karma()
RETURNS TRIGGER AS $$
BEGIN
  -- Award karma for creating content
  PERFORM award_karma_points(
    NEW.author_id,
    CASE TG_TABLE_NAME
      WHEN 'forum_posts' THEN 5  -- More karma for posts
      ELSE 2                     -- Less karma for comments
    END,
    CASE TG_TABLE_NAME
      WHEN 'forum_posts' THEN 'Created new post'
      ELSE 'Posted new comment'
    END,
    CASE TG_TABLE_NAME
      WHEN 'forum_posts' THEN 'post'
      ELSE 'comment'
    END,
    NEW.id
  );
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for content karma awards
DROP TRIGGER IF EXISTS award_post_karma_trigger ON forum_posts;
CREATE TRIGGER award_post_karma_trigger
  AFTER INSERT ON forum_posts
  FOR EACH ROW
  EXECUTE FUNCTION award_content_karma();

DROP TRIGGER IF EXISTS award_comment_karma_trigger ON forum_comments;
CREATE TRIGGER award_comment_karma_trigger
  AFTER INSERT ON forum_comments
  FOR EACH ROW
  EXECUTE FUNCTION award_content_karma();

-- Create view for user karma stats
CREATE OR REPLACE VIEW forum_user_karma_stats AS
SELECT 
  u.id,
  u.first_name,
  u.last_name,
  p.karma_points,
  COALESCE(SUM(CASE WHEN h.source_type = 'post' THEN 1 ELSE 0 END), 0) as post_karma,
  COALESCE(SUM(CASE WHEN h.source_type = 'comment' THEN 1 ELSE 0 END), 0) as comment_karma,
  COALESCE(SUM(CASE WHEN h.amount > 0 THEN 1 ELSE 0 END), 0) as positive_karma,
  COALESCE(SUM(CASE WHEN h.amount < 0 THEN 1 ELSE 0 END), 0) as negative_karma
FROM users u
LEFT JOIN forum_profiles p ON u.id = p.id
LEFT JOIN forum_karma_history h ON u.id = h.user_id
GROUP BY u.id, u.first_name, u.last_name, p.karma_points;