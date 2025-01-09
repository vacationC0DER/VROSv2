import React from 'react';
import { Calendar, Users, Flag } from 'lucide-react';
import { ProjectStatusBadge } from '../../projects/ProjectStatusBadge';
import type { Project } from '../../../types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="ml-12 border border-gray-200 rounded-lg bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-gray-900">{project.title}</h4>
          {project.description && (
            <p className="mt-1 text-sm text-gray-600">{project.description}</p>
          )}
        </div>
        <ProjectStatusBadge status={project.status} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(project.end_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{project.department?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span>{project.progress}% complete</span>
          </div>
        </div>

        <div className="flex -space-x-2">
          {/* TODO: Add team member avatars */}
          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
            <span className="text-xs font-medium">JD</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
            <span className="text-xs font-medium">AS</span>
          </div>
        </div>
      </div>
    </div>
  );
}