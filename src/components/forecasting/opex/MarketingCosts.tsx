import React from 'react';
import { useOperatingExpenses } from '../../../hooks/useOperatingExpenses';
import { OpexInput } from './OpexInput';

export function MarketingCosts() {
  const { expenses, updateExpense } = useOperatingExpenses();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Marketing</h3>
      <OpexInput
        label="Marketing Budget"
        value={expenses.marketingCosts.marketingBudget}
        onChange={(value) => updateExpense(['marketingCosts', 'marketingBudget'], value)}
        prefix="$"
      />
      <OpexInput
        label="Customer Acquisition Cost"
        value={expenses.marketingCosts.customerAcquisitionCosts}
        onChange={(value) => updateExpense(['marketingCosts', 'customerAcquisitionCosts'], value)}
        prefix="$"
      />
    </div>
  );
}