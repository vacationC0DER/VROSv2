-- Create forum user profiles table
CREATE TABLE forum_profiles (
  id uuid PRIMARY KEY REFERENCES users(id),
  karma_points integer DEFAULT 0,
  posts_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  last_seen_at timestamptz,
  avatar_url text,
  title text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create karma history table
CREATE TABLE forum_karma_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  amount integer NOT NULL,
  reason text NOT NULL,
  source_type text NOT NULL,
  source_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add trigger to update user profile counts
CREATE OR REPLACE FUNCTION update_forum_profile_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'forum_posts' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE forum_profiles 
      SET posts_count = posts_count + 1
      WHERE id = NEW.author_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE forum_profiles 
      SET posts_count = posts_count - 1
      WHERE id = OLD.author_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'forum_comments' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE forum_profiles 
      SET comments_count = comments_count + 1
      WHERE id = NEW.author_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE forum_profiles 
      SET comments_count = comments_count - 1
      WHERE id = OLD.author_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for post and comment counts
CREATE TRIGGER forum_posts_count_trigger
  AFTER INSERT OR DELETE ON forum_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_forum_profile_counts();

CREATE TRIGGER forum_comments_count_trigger
  AFTER INSERT OR DELETE ON forum_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_forum_profile_counts();

-- Function to award karma points
CREATE OR REPLACE FUNCTION award_karma_points(
  user_id uuid,
  amount integer,
  reason text,
  source_type text,
  source_id uuid
) RETURNS void AS $$
BEGIN
  -- Insert karma history record
  INSERT INTO forum_karma_history (
    user_id, amount, reason, source_type, source_id
  ) VALUES (
    user_id, amount, reason, source_type, source_id
  );

  -- Update user's karma points
  UPDATE forum_profiles
  SET karma_points = karma_points + amount
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS
ALTER TABLE forum_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_karma_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view forum profiles"
  ON forum_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON forum_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Anyone can view karma history"
  ON forum_karma_history FOR SELECT
  TO authenticated
  USING (true);

-- Create function to handle new user forum profile
CREATE OR REPLACE FUNCTION handle_new_forum_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO forum_profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new user forum profile
CREATE TRIGGER on_auth_user_created_forum
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_forum_user();

-- Insert profiles for existing users
INSERT INTO forum_profiles (id)
SELECT id FROM users
ON CONFLICT (id) DO NOTHING;