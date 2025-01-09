import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useStaffPayroll } from '../../../hooks/useStaffPayroll';

export function StaffList() {
  const { staff, removeStaffMember, editStaffMember } = useStaffPayroll();

  return (
    <div className="space-y-4 mb-6">
      {staff.map((member) => (
        <div 
          key={member.id}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
        >
          <div>
            <h3 className="font-medium">{member.position}</h3>
            <p className="text-sm text-gray-600">
              {member.payType === 'salary' 
                ? `$${member.payRate.toLocaleString()}/year`
                : `$${member.payRate}/hour`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Monthly Cost</p>
              <p className="text-sm text-gray-600">
                ${Math.round(member.monthlyCost).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => editStaffMember(member)}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeStaffMember(member.id)}
                className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {staff.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No staff members added yet
        </p>
      )}
    </div>
  );
}