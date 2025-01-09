import React from 'react';
import { useParams } from 'react-router-dom';
import { useMessages } from '../hooks/useMessages';
import { useConversations } from '../hooks/useConversations';
import { MessageList } from '../components/messages/MessageList';
import { MessageInput } from '../components/messages/MessageInput';
import { ConversationList } from '../components/messages/ConversationList';
import { ConversationHeader } from '../components/messages/ConversationHeader';
import { NewConversationButton } from '../components/messages/NewConversationButton';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ConversationEmpty } from '../components/messages/conversation/ConversationEmpty';

export function Messages() {
  const { conversationId } = useParams();
  const { conversations, loading: loadingConversations } = useConversations();
  const { messages, loading: loadingMessages, sendMessage } = useMessages(conversationId || null);

  const selectedConversation = conversations.find(c => c.id === conversationId);

  if (loadingConversations) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] -m-8">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold mb-4">Messages</h1>
          <NewConversationButton />
        </div>
        <div className="flex-1 overflow-y-auto">
          <ConversationList 
            conversations={conversations}
            selectedId={conversationId}
          />
        </div>
      </div>

      {/* Messages Area */}
      {conversationId && selectedConversation ? (
        <div className="flex-1 flex flex-col bg-white">
          <ConversationHeader conversation={selectedConversation} />
          {loadingMessages ? (
            <LoadingSpinner />
          ) : (
            <>
              <MessageList messages={messages} />
              <MessageInput onSend={sendMessage} />
            </>
          )}
        </div>
      ) : (
        <ConversationEmpty />
      )}
    </div>
  );
}