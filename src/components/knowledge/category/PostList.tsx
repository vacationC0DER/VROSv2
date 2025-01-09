import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Calendar } from 'lucide-react';
import { useKnowledgeStore } from '../../../stores/knowledgeStore';
import { formatTimeAgo } from '../../../utils/formatters';

export function PostList() {
  const { articles } = useKnowledgeStore();

  if (!articles.length) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">No articles found in this category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Link
          key={article.id}
          to={`/knowledge/article/${article.id}`}
          className="block bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate">{article.title}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>
                  {article.author?.first_name} {article.author?.last_name}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatTimeAgo(article.created_at)}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {article.view_count} views
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}