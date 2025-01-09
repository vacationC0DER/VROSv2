import { useEffect } from 'react';
import { useDepartmentStore } from '../stores/departmentStore';

export function useDepartments() {
  const { departments, loading, error, fetchDepartments } = useDepartmentStore();

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return { departments, loading, error };
}