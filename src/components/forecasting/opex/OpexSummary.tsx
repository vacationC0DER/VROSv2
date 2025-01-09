import React from 'react';
import { TrendingUp } from 'lucide-react';

interface OpexSummaryProps {
  totals: {
    monthlyFixed: number;
    monthlyVariable: number;
    totalMonthly: number;
    annualProjection: number;
  };
}

export function OpexSummary({ totals }: OpexSummaryProps) {
  return (
    <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
      <div>
        <p className="text-sm text-gray-600">Fixed Monthly</p>
        <p className="text-lg font-semibold">
          ${Math.round(totals.monthlyFixed).toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Variable Monthly</p>
        <p className="text-lg font-semibold">
          ${Math.round(totals.monthlyVariable).toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Total Monthly</p>
        <p className="text-lg font-semibold">
          ${Math.round(totals.totalMonthly).toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Annual Projection</p>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4 text-orange-600" />
          <p className="text-lg font-semibold">
            ${Math.round(totals.annualProjection).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}