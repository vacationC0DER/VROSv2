import React from 'react';

export function ConversationSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header Skeleton */}
      <div className="h-16 px-4 border-b border-gray-200 flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Messages Skeleton */}
      <div className="flex-1 p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <div className={`w-64 h-16 rounded-lg animate-pulse ${
              i % 2 === 0 ? 'bg-gray-200' : 'bg-indigo-100'
            }`} />
          </div>
        ))}
      </div>

      {/* Input Skeleton */}
      <div className="p-4 border-t border-gray-200">
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}