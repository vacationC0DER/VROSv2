export interface KnowledgeCategory {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  icon: string | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category_id: string;
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  category?: KnowledgeCategory;
  author?: {
    first_name: string;
    last_name: string;
  };
  attachments?: KnowledgeAttachment[];
}

export interface KnowledgeAttachment {
  id: string;
  article_id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
}