import React from 'react';
import { Calendar, Users, Target, Clock } from 'lucide-react';
import { ProjectStatusBadge } from './ProjectStatusBadge';
import type { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const getDaysRemaining = () => {
    const end = new Date(project.end_date);
    const now = new Date();
    const days = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{project.title}</h3>
          <ProjectStatusBadge status={project.status} />
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{project.progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="space-y-2">
          {/* Department */}
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 truncate">
              {project.department?.name || 'No Department'}
            </span>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">
              {new Date(project.end_date).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {/* Linked Objective */}
          {project.objective && (
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 truncate" title={project.objective.title}>
                {project.objective.title}
              </span>
            </div>
          )}

          {/* Days Remaining */}
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className={`${
              daysRemaining < 7 ? 'text-red-600' :
              daysRemaining < 14 ? 'text-yellow-600' :
              'text-gray-600'
            }`}>
              {daysRemaining} days left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}