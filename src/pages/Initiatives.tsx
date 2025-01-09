import React, { useState } from 'react';
import { ProjectsList } from '../components/projects/ProjectsList';
import { InitiativesHeader } from '../components/initiatives/InitiativesHeader';
import { InitiativesFilters } from '../components/initiatives/InitiativesFilters';
import { CreateInitiativeModal } from '../components/initiatives/create/CreateInitiativeModal';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorAlert } from '../components/shared/ErrorAlert';
import { EmptyState } from '../components/shared/EmptyState';
import { useFilteredProjects } from '../hooks/useFilteredProjects';

export function Initiatives() {
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
        title="No initiatives found"
        description="Get started by creating your first initiative"
        actionLabel="Create Initiative"
        onAction={() => setShowCreateModal(true)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <InitiativesHeader onCreateClick={() => setShowCreateModal(true)} />
      <InitiativesFilters
        selectedDepartment={selectedDepartment}
        selectedCategory={selectedCategory}
        onDepartmentChange={setSelectedDepartment}
        onCategoryChange={setSelectedCategory}
      />
      <ProjectsList projects={projects} />
      
      {showCreateModal && (
        <CreateInitiativeModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}