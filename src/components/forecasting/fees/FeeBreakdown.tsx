import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useFeeStructure } from '../../../hooks/useFeeStructure';

export function FeeBreakdown() {
  const { calculatedFees } = useFeeStructure();

  return (
    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
      <div>
        <p className="text-sm text-gray-600">Average Fee/Stay</p>
        <p className="text-lg font-semibold">
          ${calculatedFees.averageFeePerStay}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Fee % of Revenue</p>
        <p className="text-lg font-semibold">
          {calculatedFees.feePercentage}%
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Monthly Fee Revenue</p>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <p className="text-lg font-semibold">
            ${calculatedFees.monthlyFeeRevenue}
          </p>
        </div>
      </div>
    </div>
  );
}