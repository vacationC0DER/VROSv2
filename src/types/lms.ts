export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number; // in minutes
  scorm_url: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
  author_id: string;
  published: boolean;
}

export interface CourseProgress {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  completed: boolean;
  last_accessed: string;
  completion_date?: string;
  scorm_data: Record<string, any>;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
}