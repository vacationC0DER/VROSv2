import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pin, Eye } from 'lucide-react';
import { useKnowledgeStore } from '../../../stores/knowledgeStore';

export function FeaturedPosts() {
  const { articles, fetchArticles } = useKnowledgeStore();
  const featuredArticles = articles.filter(article => article.is_featured);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (!featuredArticles.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Pin className="h-5 w-5" />
        Featured Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredArticles.map((article) => (
          <Link
            key={article.id}
            to={`/knowledge/article/${article.id}`}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold mb-2">{article.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                {article.author?.first_name} {article.author?.last_name}
              </span>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {article.view_count} views
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}