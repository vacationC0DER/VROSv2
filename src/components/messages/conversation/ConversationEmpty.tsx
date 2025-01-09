import React from 'react';
import { MessageSquare } from 'lucide-react';

export function ConversationEmpty() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-center p-8">
      <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
      <p className="text-gray-500 max-w-sm">
        Choose a conversation from the sidebar or start a new one to begin messaging
      </p>
    </div>
  );
}