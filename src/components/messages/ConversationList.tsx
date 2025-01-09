import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { Conversation } from '../../types/message';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
}

export function ConversationList({ conversations, selectedId }: ConversationListProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="divide-y divide-gray-200">
      {conversations.map((conversation) => {
        const otherParticipant = conversation.participants.find(
          p => p.user_id !== user?.id
        );

        if (!otherParticipant) return null;

        return (
          <button
            key={conversation.id}
            onClick={() => navigate(`/messages/${conversation.id}`)}
            className={`w-full p-4 text-left hover:bg-gray-50 ${
              selectedId === conversation.id ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {otherParticipant.user.first_name[0]}
                  {otherParticipant.user.last_name[0]}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {otherParticipant.user.first_name} {otherParticipant.user.last_name}
                </p>
                {conversation.last_message && (
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.last_message.content}
                  </p>
                )}
              </div>

              {conversation.last_message && (
                <span className="text-xs text-gray-500">
                  {new Date(conversation.last_message.created_at).toLocaleTimeString()}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}