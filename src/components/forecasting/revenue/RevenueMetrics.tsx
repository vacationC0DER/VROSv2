import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useRevenueDynamics } from '../../../hooks/useRevenueDynamics';

export function RevenueMetrics() {
  const { calculatedMetrics } = useRevenueDynamics();

  return (
    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
      <div>
        <p className="text-sm text-gray-600">RevPAR</p>
        <p className="text-lg font-semibold">
          ${calculatedMetrics.revPAR}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Total Occupancy</p>
        <p className="text-lg font-semibold">
          {calculatedMetrics.totalOccupancy}%
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Revenue/Stay</p>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <p className="text-lg font-semibold">
            ${calculatedMetrics.revenuePerStay}
          </p>
        </div>
      </div>
    </div>
  );
}