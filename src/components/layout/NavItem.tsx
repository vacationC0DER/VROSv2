import React from 'react';
import { Link } from 'react-router-dom';
import { useUIStore } from '../../stores/uiStore';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

export function NavItem({ to, icon, label, active }: NavItemProps) {
  const { sidebarCollapsed } = useUIStore();

  return (
    <Link
      to={to}
      className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''} px-4 py-2 rounded-lg transition-all duration-200 ${
        active
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
      title={sidebarCollapsed ? label : undefined}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span className={`transition-all duration-200 ${
        sidebarCollapsed 
          ? 'w-0 opacity-0 hidden' 
          : 'w-auto opacity-100 ml-3'
      }`}>
        {label}
      </span>
    </Link>
  );
}