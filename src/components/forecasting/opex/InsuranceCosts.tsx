import React from 'react';
import { useOperatingExpenses } from '../../../hooks/useOperatingExpenses';
import { OpexInput } from './OpexInput';

export function InsuranceCosts() {
  const { expenses, updateExpense } = useOperatingExpenses();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Insurance</h3>
      <OpexInput
        label="Liability Insurance"
        value={expenses.insurance.liability}
        onChange={(value) => updateExpense(['insurance', 'liability'], value)}
        prefix="$"
      />
      <OpexInput
        label="Workers Comp"
        value={expenses.insurance.workersComp}
        onChange={(value) => updateExpense(['insurance', 'workersComp'], value)}
        prefix="$"
      />
      <OpexInput
        label="Property Insurance"
        value={expenses.insurance.propertyInsurance}
        onChange={(value) => updateExpense(['insurance', 'propertyInsurance'], value)}
        prefix="$"
      />
    </div>
  );
}