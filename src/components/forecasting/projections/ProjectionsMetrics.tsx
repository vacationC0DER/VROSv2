import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { AnnualMetrics } from '../../../types/forecasting';

interface ProjectionsMetricsProps {
  metrics: AnnualMetrics;
}

export function ProjectionsMetrics({ metrics }: ProjectionsMetricsProps) {
  return (
    <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
      <div>
        <p className="text-sm text-gray-600">Annual Revenue</p>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4 text-indigo-600" />
          <p className="text-lg font-semibold">
            ${Math.round(metrics.annualRevenue).toLocaleString()}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">Annual Expenses</p>
        <div className="flex items-center gap-1">
          <TrendingDown className="h-4 w-4 text-orange-600" />
          <p className="text-lg font-semibold">
            ${Math.round(metrics.annualExpenses).toLocaleString()}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">Net Profit</p>
        <p className="text-lg font-semibold text-green-600">
          ${Math.round(metrics.netProfit).toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Profit Margin</p>
        <p className="text-lg font-semibold">
          {metrics.profitMargin}%
        </p>
      </div>
    </div>
  );
}