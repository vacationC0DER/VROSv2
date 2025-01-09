import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import { PostContent } from './post/PostContent';
import { PostHeader } from './post/PostHeader';
import { PostComments } from './post/PostComments';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorAlert } from '../shared/ErrorAlert';

export function KnowledgePost() {
  const { postId } = useParams();
  const { posts, loading, error, fetchPosts } = useKnowledgeStore();
  
  const post = posts.find(p => p.id === postId);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!post) return <ErrorAlert message="Post not found" />;

  return (
    <div className="space-y-8">
      <Link 
        to={`/knowledge/category/${post.category?.slug}`}
        className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to {post.category?.name}
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <PostHeader post={post} />
        <PostContent post={post} />
        <PostComments postId={post.id} />
      </div>
    </div>
  );
}