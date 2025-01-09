import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2, X, Check } from 'lucide-react';
import { formatTimeAgo } from '../../../lib/formatters';
import type { Comment } from '../../../types/comment';

interface CommentItemProps {
  comment: Comment;
  currentUserId: string;
  onUpdate: (id: string, text: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function CommentItem({ 
  comment, 
  currentUserId,
  onUpdate,
  onDelete 
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [error, setError] = useState<string | null>(null);
  const isOwner = currentUserId === comment.user_id;

  const handleUpdate = async () => {
    if (!editText.trim()) return;
    
    try {
      await onUpdate(comment.id, editText);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update comment');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await onDelete(comment.id);
    } catch (err) {
      setError('Failed to delete comment');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {comment.user.first_name} {comment.user.last_name}
          </span>
          <span className="text-sm text-gray-500">
            {formatTimeAgo(comment.created_at)}
          </span>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={() => {
                setEditText(comment.text);
                setIsEditing(false);
                setError(null);
              }}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              onClick={handleUpdate}
              className="p-2 text-indigo-600 hover:text-indigo-700 rounded-full hover:bg-indigo-50"
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-gray-600">{comment.text}</p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}