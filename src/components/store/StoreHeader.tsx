import React from 'react';
import { Store, History } from 'lucide-react';
import { useNotificationStore } from '../../stores/notificationStore';

interface StoreHeaderProps {
  onShowHistory: () => void;
}

export function StoreHeader({ onShowHistory }: StoreHeaderProps) {
  const { unreadCount } = useNotificationStore();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Store className="h-7 w-7 text-indigo-600" />
          Supply Store
        </h1>
        <p className="text-gray-600 mt-1">Weekly purchase orders for property supplies</p>
      </div>
      <button 
        onClick={onShowHistory}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <History className="h-4 w-4" />
        <span>Order History</span>
        {unreadCount > 0 && (
          <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}