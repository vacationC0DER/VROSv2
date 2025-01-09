import React from 'react';
import { FileText } from 'lucide-react';
import type { ForumPost } from '../../../types/forum';

interface PostContentProps {
  post: ForumPost;
}

export function PostContent({ post }: PostContentProps) {
  return (
    <div className="p-6">
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      {post.attachments && post.attachments.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold mb-4">Attachments</h3>
          <div className="space-y-2">
            {post.attachments.map((attachment) => (
              <a
                key={attachment.id}
                href={attachment.file_path}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-900">{attachment.name}</span>
                <span className="text-sm text-gray-500">
                  ({Math.round(attachment.file_size / 1024)}KB)
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}