import React, { useState } from 'react';
import { X, Mail, Phone, MessageSquare } from 'lucide-react';

interface LogCommunicationModalProps {
  dealId: string;
  onClose: () => void;
  onSubmit: (data: {
    type: 'email' | 'phone' | 'sms';
    subject?: string;
    content: string;
    direction: 'inbound' | 'outbound';
  }) => Promise<void>;
}

export function LogCommunicationModal({ dealId, onClose, onSubmit }: LogCommunicationModalProps) {
  const [formData, setFormData] = useState({
    type: 'email' as const,
    subject: '',
    content: '',
    direction: 'outbound' as const
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Failed to log communication:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Log Communication</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Communication Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'email' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  formData.type === 'email'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'phone' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  formData.type === 'phone'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Phone className="h-4 w-4" />
                <span>Phone</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'sms' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  formData.type === 'sms'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>SMS</span>
              </button>
            </div>
          </div>

          {/* Direction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Direction
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, direction: 'outbound' })}
                className={`px-4 py-2 rounded-lg ${
                  formData.direction === 'outbound'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Outbound
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, direction: 'inbound' })}
                className={`px-4 py-2 rounded-lg ${
                  formData.direction === 'inbound'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Inbound
              </button>
            </div>
          </div>

          {/* Subject (for email only) */}
          {formData.type === 'email' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formData.type === 'phone' ? 'Call Notes' : 'Content'}
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={
                formData.type === 'phone'
                  ? 'Enter call summary and next steps...'
                  : 'Enter message content...'
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Log Communication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}