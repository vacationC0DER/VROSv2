import React from 'react';
import { Phone, Video, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { Conversation } from '../../types/message';

interface ConversationHeaderProps {
  conversation: Conversation;
}

export function ConversationHeader({ conversation }: ConversationHeaderProps) {
  const { user } = useAuth();
  const otherParticipant = conversation.participants.find(p => p.user_id !== user?.id);

  if (!otherParticipant) return null;

  return (
    <div className="h-16 px-4 border-b border-gray-200 flex items-center justify-between bg-white">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">
            {otherParticipant.user.first_name[0]}
            {otherParticipant.user.last_name[0]}
          </span>
        </div>
        <h2 className="font-semibold">
          {otherParticipant.user.first_name} {otherParticipant.user.last_name}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Phone className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Video className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Info className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}