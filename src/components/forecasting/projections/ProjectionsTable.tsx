import React from 'react';
import { useFinancialProjections } from '../../../hooks/useFinancialProjections';

export function ProjectionsTable() {
  const { projections } = useFinancialProjections();

  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            <th className="py-3 px-4 text-left font-semibold text-gray-900 sticky left-0 bg-gray-50">Month</th>
            <th className="py-3 px-4 text-right font-semibold text-gray-900">Properties</th>
            <th className="py-3 px-4 text-right font-semibold text-gray-900">Revenue</th>
            <th className="py-3 px-4 text-right font-semibold text-gray-900">Expenses</th>
            <th className="py-3 px-4 text-right font-semibold text-gray-900">Net Profit</th>
            <th className="py-3 px-4 text-right font-semibold text-gray-900">Margin %</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {projections.monthlyData.map((month, index) => (
            <tr 
              key={month.month}
              className={`border-b border-gray-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <td className="py-3 px-4 font-medium sticky left-0 bg-inherit">{month.month}</td>
              <td className="py-3 px-4 text-right">{month.properties}</td>
              <td className="py-3 px-4 text-right">${month.revenue.toLocaleString()}</td>
              <td className="py-3 px-4 text-right">${month.expenses.toLocaleString()}</td>
              <td className={`py-3 px-4 text-right font-medium ${
                month.profit >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${Math.abs(month.profit).toLocaleString()}
              </td>
              <td className="py-3 px-4 text-right">
                {((month.profit / month.revenue) * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>

        {/* Table Footer */}
        <tfoot>
          <tr className="bg-gray-100 border-t-2 border-gray-300 font-semibold">
            <td className="py-3 px-4 sticky left-0 bg-gray-100">Annual Totals</td>
            <td className="py-3 px-4 text-right">-</td>
            <td className="py-3 px-4 text-right">
              ${projections.annualMetrics.annualRevenue.toLocaleString()}
            </td>
            <td className="py-3 px-4 text-right">
              ${projections.annualMetrics.annualExpenses.toLocaleString()}
            </td>
            <td className={`py-3 px-4 text-right ${
              projections.annualMetrics.netProfit >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ${Math.abs(projections.annualMetrics.netProfit).toLocaleString()}
            </td>
            <td className="py-3 px-4 text-right">
              {projections.annualMetrics.profitMargin}%
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}