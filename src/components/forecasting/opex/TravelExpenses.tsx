import React from 'react';
import { useOperatingExpenses } from '../../../hooks/useOperatingExpenses';
import { OpexInput } from './OpexInput';

export function TravelExpenses() {
  const { expenses, updateExpense } = useOperatingExpenses();

  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-sm font-medium text-gray-700">Travel & Entertainment</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <OpexInput
            label="Mileage Rate"
            value={expenses.mileageRate}
            onChange={(value) => updateExpense(['mileageRate'], value)}
            prefix="$"
          />
          <OpexInput
            label="Estimated Monthly Miles"
            value={expenses.estimatedMonthlyMiles}
            onChange={(value) => updateExpense(['estimatedMonthlyMiles'], value)}
          />
        </div>
        <div className="space-y-4">
          <OpexInput
            label="Travel Budget"
            value={expenses.travelBudget}
            onChange={(value) => updateExpense(['travelBudget'], value)}
            prefix="$"
          />
          <OpexInput
            label="Meals & Entertainment"
            value={expenses.mealsAndEntertainment}
            onChange={(value) => updateExpense(['mealsAndEntertainment'], value)}
            prefix="$"
          />
        </div>
      </div>
    </div>
  );
}