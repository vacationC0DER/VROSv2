import React from 'react';
import { DollarSign } from 'lucide-react';
import { useRevenueDynamics } from '../../hooks/useRevenueDynamics';
import { MonthlySeasonality } from './revenue/MonthlySeasonality';
import { RevenueMetrics } from './revenue/RevenueMetrics';

export function RevenueDynamics() {
  const { metrics, updateMetric } = useRevenueDynamics();

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="h-5 w-5 text-green-600" />
        <h2 className="font-semibold">Revenue Dynamics</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Average Daily Rate (ADR)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              min="0"
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={metrics.averageDailyRate}
              onChange={(e) => updateMetric('averageDailyRate', Number(e.target.value))}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Average Length of Stay (Days)
          </label>
          <input
            type="number"
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={metrics.lengthOfStay}
            onChange={(e) => updateMetric('lengthOfStay', Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paid Occupancy Rate (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={metrics.paidOccupancy}
            onChange={(e) => updateMetric('paidOccupancy', Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Non-Revenue Occupancy (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={metrics.nonRevenueOccupancy}
            onChange={(e) => updateMetric('nonRevenueOccupancy', Number(e.target.value))}
          />
        </div>
      </div>

      <MonthlySeasonality />
      <RevenueMetrics />
    </div>
  );
}