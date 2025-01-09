import { useState, useMemo } from 'react';
import { useProjects } from './useProjects';
import type { Project } from '../types/project';

export function useFilteredProjects() {
  const { projects, loading, error } = useProjects();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    return projects.filter((project: Project) => {
      const matchesDepartment = !selectedDepartment || project.department_id === selectedDepartment;
      const matchesCategory = !selectedCategory || (project.objective?.category || '').startsWith(
        selectedCategory === 'financial' ? 'F' :
        selectedCategory === 'customer' ? 'C' :
        selectedCategory === 'internal' ? 'P' :
        selectedCategory === 'enablers' ? 'E' : ''
      );

      return matchesDepartment && matchesCategory;
    });
  }, [projects, selectedDepartment, selectedCategory]);

  return {
    projects: filteredProjects,
    loading,
    error,
    selectedDepartment,
    selectedCategory,
    setSelectedDepartment,
    setSelectedCategory
  };
}