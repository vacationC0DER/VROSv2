import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailsModal } from './details/ProjectDetailsModal';
import type { Project } from '../../types/project';

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectDetailsModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}