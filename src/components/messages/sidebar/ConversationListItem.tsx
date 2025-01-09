import React, { memo } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import type { Conversation } from '../../../types/message';
import { formatMessageTime } from '../../../utils/formatters';

interface ConversationListItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export const ConversationListItem = memo(function ConversationListItem({ 
  conversation, 
  isSelected, 
  onClick 
}: ConversationListItemProps) {
  const { user } = useAuth();
  const otherParticipant = conversation.participants.find(p => p.user_id !== user?.id);

  if (!otherParticipant) return null;

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-gray-50' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-gray-600">
            {otherParticipant.user.first_name[0]}
            {otherParticipant.user.last_name[0]}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline">
            <p className="font-medium text-gray-900 truncate">
              {otherParticipant.user.first_name} {otherParticipant.user.last_name}
            </p>
            {conversation.last_message && (
              <span className="text-xs text-gray-500 flex-shrink-0">
                {formatMessageTime(conversation.last_message.created_at)}
              </span>
            )}
          </div>
          {conversation.last_message && (
            <p className="text-sm text-gray-600 truncate">
              {conversation.last_message.content}
            </p>
          )}
        </div>
      </div>
    </button>
  );
});