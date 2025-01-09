import React from 'react';
import { useOperatingExpenses } from '../../../hooks/useOperatingExpenses';
import { OpexInput } from './OpexInput';

export function FacilityCosts() {
  const { expenses, updateExpense } = useOperatingExpenses();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Facility Costs</h3>
      <OpexInput
        label="Office Rent"
        value={expenses.facilityCosts.officeRent}
        onChange={(value) => updateExpense(['facilityCosts', 'officeRent'], value)}
        prefix="$"
      />
      <OpexInput
        label="Utilities"
        value={expenses.facilityCosts.utilities}
        onChange={(value) => updateExpense(['facilityCosts', 'utilities'], value)}
        prefix="$"
      />
    </div>
  );
}