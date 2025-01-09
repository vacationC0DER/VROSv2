import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';

export function SidebarToggle() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  
  return (
    <button
      onClick={toggleSidebar}
      className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50 z-10"
    >
      {sidebarCollapsed ? (
        <ChevronRight className="h-4 w-4 text-gray-600" />
      ) : (
        <ChevronLeft className="h-4 w-4 text-gray-600" />
      )}
    </button>
  );
}