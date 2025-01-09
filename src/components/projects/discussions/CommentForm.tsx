import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface CommentFormProps {
  onSubmit: (text: string) => Promise<void>;
  placeholder?: string;
  disabled?: boolean;
}

export function CommentForm({ 
  onSubmit, 
  placeholder = "Add a comment...",
  disabled = false 
}: CommentFormProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting || disabled) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(text.trim());
      setText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            disabled={isSubmitting || disabled}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!text.trim() || isSubmitting || disabled}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    </form>
  );
}