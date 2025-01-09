import React, { useState } from 'react';
import { ProjectsList } from '../components/projects/ProjectsList';
import { ProjectsHeader } from '../components/projects/ProjectsHeader';
import { ProjectFilters } from '../components/projects/filters/ProjectFilters';
import { CreateProjectModal } from '../components/projects/create/CreateProjectModal';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorAlert } from '../components/shared/ErrorAlert';
import { EmptyState } from '../components/shared/EmptyState';
import { useFilteredProjects } from '../hooks/useFilteredProjects';

export function Projects() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const {
    projects,
    loading,
    error,
    selectedDepartment,
    selectedCategory,
    setSelectedDepartment,
    setSelectedCategory
  } = useFilteredProjects();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!projects?.length) {
    return (
      <EmptyState
        title="No projects found"
        description="Get started by creating your first project"
        actionLabel="Create Project"
        onAction={() => setShowCreateModal(true)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ProjectsHeader onCreateClick={() => setShowCreateModal(true)} />
      <ProjectFilters
        selectedDepartment={selectedDepartment}
        selectedCategory={selectedCategory}
        onDepartmentChange={setSelectedDepartment}
        onCategoryChange={setSelectedCategory}
      />
      <ProjectsList projects={projects} />
      
      {showCreateModal && (
        <CreateProjectModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}