import React, { useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { Message } from '../../types/message';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isOwnMessage = message.sender_id === user?.id;

        return (
          <div
            key={message.id}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                isOwnMessage
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {!isOwnMessage && message.sender && (
                <p className="text-xs font-medium mb-1">
                  {message.sender.first_name} {message.sender.last_name}
                </p>
              )}
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-75">
                {new Date(message.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}