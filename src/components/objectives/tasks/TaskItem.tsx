import React from 'react';
import { Calendar, CheckCircle, User } from 'lucide-react';

interface TaskItemProps {
  title: string;
  dueDate: string;
  assignee: {
    name: string;
    initials: string;
  };
  status: 'pending' | 'completed';
  onStatusChange: () => void;
}

export function TaskItem({ title, dueDate, assignee, status, onStatusChange }: TaskItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <button
        onClick={onStatusChange}
        className={`flex-shrink-0 ${
          status === 'completed' ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'
        }`}
      >
        <CheckCircle className="h-5 w-5" />
      </button>

      <div className="flex-1 min-w-0">
        <h4 className={`font-medium ${
          status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
        }`}>
          {title}
        </h4>
        
        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{dueDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{assignee.name}</span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
        <span className="text-sm font-medium text-gray-600">{assignee.initials}</span>
      </div>
    </div>
  );
}