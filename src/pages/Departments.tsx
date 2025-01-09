import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DepartmentCard } from '../components/departments/DepartmentCard';
import { TeamMembersList } from '../components/departments/TeamMembersList';
import { DepartmentTasks } from '../components/departments/DepartmentTasks';
import { DepartmentMetrics } from '../components/departments/DepartmentMetrics';
import { useDepartments } from '../hooks/useDepartments';
import type { Department } from '../types/department';

export function Departments() {
  const { departments, loading } = useDepartments();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Departments</h1>
          <p className="text-gray-600">Manage teams and track department performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus className="h-5 w-5" />
          <span>New Department</span>
        </button>
      </div>

      {!selectedDepartment ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={department}
              onSelect={setSelectedDepartment}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedDepartment(null)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Departments
          </button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold">{selectedDepartment.name}</h2>
                <p className="text-gray-600">Department Overview</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                Edit Department
              </button>
            </div>

            <DepartmentMetrics
              metrics={[
                { label: 'Tasks Completed', value: '45', change: '+12% from last month', trend: 'up' },
                { label: 'Active Projects', value: '8', change: 'No change', trend: 'neutral' },
                { label: 'Team Members', value: '12', change: '+2 this month', trend: 'up' },
                { label: 'Completion Rate', value: '94%', change: '+5% from average', trend: 'up' }
              ]}
            />

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Team Members</h3>
              <TeamMembersList members={[]} /> {/* TODO: Add real team members data */}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Department Tasks</h3>
              <DepartmentTasks 
                tasks={[]} 
                onStatusChange={(taskId, status) => {
                  // TODO: Implement status change
                  console.log('Status changed:', taskId, status);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}