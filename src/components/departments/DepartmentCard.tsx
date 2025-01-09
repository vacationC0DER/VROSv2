import React from 'react';
import { Users, ChevronRight } from 'lucide-react';
import type { Department } from '../../types/department';

interface DepartmentCardProps {
  department: Department;
  onSelect: (department: Department) => void;
}

export function DepartmentCard({ department, onSelect }: DepartmentCardProps) {
  return (
    <div 
      onClick={() => onSelect(department)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{department.name}</h3>
            <p className="text-sm text-gray-600">
              {department.member_count || 0} team members
            </p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>

      {department.head && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {department.head.first_name[0]}{department.head.last_name[0]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {department.head.first_name} {department.head.last_name}
              </p>
              <p className="text-xs text-gray-600">Department Head</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}