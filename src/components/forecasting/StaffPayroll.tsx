import React from 'react';
import { Users } from 'lucide-react';
import { useStaffPayroll } from '../../hooks/useStaffPayroll';
import { StaffList } from './staff/StaffList';
import { AddStaffMember } from './staff/AddStaffMember';
import { PayrollSummary } from './staff/PayrollSummary';

export function StaffPayroll() {
  const { totalPayroll } = useStaffPayroll();

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <h2 className="font-semibold">Staff & Payroll</h2>
        </div>
        <AddStaffMember />
      </div>

      <StaffList />
      <PayrollSummary totals={totalPayroll} />
    </div>
  );
}