import React from 'react';
import { Flag } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';

interface User {
  initials: string;
  color: string;
}

interface ProjectCardProps {
  title: string;
  status: 'on_track' | 'caution' | 'at_risk';
  progress: number;
  taskSummary: string;
  dueDate: string;
  department: string;
  users: User[];
}

export function ProjectCard({
  title,
  status,
  progress,
  taskSummary,
  dueDate,
  department,
  users
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-4">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <StatusBadge status={status} />
      </div>

      <ProgressBar progress={progress} />

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{taskSummary}</span>
          <div className="flex items-center gap-1">
            <Flag className="h-4 w-4" />
            <span>{dueDate}</span>
          </div>
          <span>{department}</span>
        </div>

        <div className="flex -space-x-2">
          {users.map((user, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full ${user.color} text-white flex items-center justify-center text-sm font-medium border-2 border-white`}
            >
              {user.initials}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}