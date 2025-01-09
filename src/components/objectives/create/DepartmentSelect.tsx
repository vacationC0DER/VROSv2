import React, { useEffect } from 'react';
import { useDepartmentStore } from '../../../stores/departmentStore';

interface DepartmentSelectProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function DepartmentSelect({ value, onChange, required = false }: DepartmentSelectProps) {
  const { departments, loading, error, fetchDepartments } = useDepartmentStore();

  useEffect(() => {
    console.log('DepartmentSelect: Fetching departments...');
    fetchDepartments();
  }, [fetchDepartments]);

  console.log('DepartmentSelect state:', { departments, loading, error, value });

  if (loading) {
    return (
      <select 
        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
        disabled
      >
        <option>Loading departments...</option>
      </select>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <select 
          className="w-full px-3 py-2 border border-red-300 rounded-lg bg-red-50 text-red-600"
          disabled
        >
          <option>Error loading departments</option>
        </select>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <select
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select Department</option>
      {departments?.map((dept) => (
        <option key={dept.id} value={dept.id}>
          {dept.name}
        </option>
      ))}
    </select>
  );
}