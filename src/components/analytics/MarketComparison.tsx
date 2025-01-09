import React from 'react';
import { BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { analyticsData } from '../../data/analyticsData';

export function MarketComparison() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="h-5 w-5 text-orange-600" />
        <h3 className="font-semibold">Market Comparison</h3>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analyticsData.marketComparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="yours" fill="#f97316" name="Your Properties" />
            <Bar dataKey="market" fill="#fdba74" name="Market Average" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-sm text-gray-600">Market Position</p>
          <p className="text-lg font-semibold">Top 15%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Rate Competitiveness</p>
          <p className="text-lg font-semibold">+5% above market</p>
        </div>
      </div>
    </div>
  );
}