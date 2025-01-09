// Add to existing forum.ts file

export interface ForumProfile {
  id: string;
  karma_points: number;
  posts_count: number;
  comments_count: number;
  last_seen_at: string | null;
  avatar_url: string | null;
  title: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface KarmaHistory {
  id: string;
  user_id: string;
  amount: number;
  reason: string;
  source_type: string;
  source_id: string;
  created_at: string;
}