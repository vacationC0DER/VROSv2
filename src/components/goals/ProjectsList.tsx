import React from 'react';
import { Calendar, Users } from 'lucide-react';
import { useProjectStore } from '../../stores/projectStore';

interface ProjectsListProps {
  objectiveId: string;
}

export function ProjectsList({ objectiveId }: ProjectsListProps) {
  const { projects } = useProjectStore();
  const relatedProjects = projects.filter(p => p.objective_id === objectiveId);

  if (!relatedProjects.length) {
    return null;
  }

  return (
    <div className="ml-10 space-y-2">
      {relatedProjects.map((project) => (
        <div 
          key={project.id}
          className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{project.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
            
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(project.end_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{project.department?.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-32">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.status === 'completed' ? 'bg-green-100 text-green-800' :
              project.status === 'blocked' ? 'bg-red-100 text-red-800' :
              project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {project.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}