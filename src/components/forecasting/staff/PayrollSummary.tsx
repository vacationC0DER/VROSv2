import React from 'react';
import { TrendingUp } from 'lucide-react';

interface PayrollSummaryProps {
  totals: {
    monthlyPayroll: number;
    monthlyBenefits: number;
    monthlyTaxes: number;
    totalMonthly: number;
  };
}

export function PayrollSummary({ totals }: PayrollSummaryProps) {
  return (
    <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
      <div>
        <p className="text-sm text-gray-600">Monthly Payroll</p>
        <p className="text-lg font-semibold">
          ${Math.round(totals.monthlyPayroll).toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Benefits</p>
        <p className="text-lg font-semibold">
          ${Math.round(totals.monthlyBenefits).toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Taxes</p>
        <p className="text-lg font-semibold">
          ${Math.round(totals.monthlyTaxes).toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Total Monthly</p>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <p className="text-lg font-semibold">
            ${Math.round(totals.totalMonthly).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}