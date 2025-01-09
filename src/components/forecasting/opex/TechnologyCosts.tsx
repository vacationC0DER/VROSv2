import React from 'react';
import { useOperatingExpenses } from '../../../hooks/useOperatingExpenses';
import { OpexInput } from './OpexInput';

export function TechnologyCosts() {
  const { expenses, updateExpense } = useOperatingExpenses();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Technology</h3>
      <OpexInput
        label="Property Management Software"
        value={expenses.technologyCosts.propertyManagementSoftware}
        onChange={(value) => updateExpense(['technologyCosts', 'propertyManagementSoftware'], value)}
        prefix="$"
      />
      <OpexInput
        label="Smart Lock Subscriptions"
        value={expenses.technologyCosts.smartLockSubscriptions}
        onChange={(value) => updateExpense(['technologyCosts', 'smartLockSubscriptions'], value)}
        prefix="$"
      />
      <OpexInput
        label="Other Technology Fees"
        value={expenses.technologyCosts.otherTechnologyFees}
        onChange={(value) => updateExpense(['technologyCosts', 'otherTechnologyFees'], value)}
        prefix="$"
      />
    </div>
  );
}