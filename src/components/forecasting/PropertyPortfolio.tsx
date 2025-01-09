import React from 'react';
import { Home, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useForecasting } from '../../hooks/useForecasting';

export function PropertyPortfolio() {
  const { portfolioData, updatePortfolioData } = useForecasting();

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Home className="h-5 w-5 text-indigo-600" />
        <h2 className="font-semibold">Property Portfolio</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Properties/Month
          </label>
          <input
            type="number"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={portfolioData.newPropertiesPerMonth}
            onChange={(e) => updatePortfolioData('newPropertiesPerMonth', Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Offboarded Properties/Month
          </label>
          <input
            type="number"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={portfolioData.offboardedPropertiesPerMonth}
            onChange={(e) => updatePortfolioData('offboardedPropertiesPerMonth', Number(e.target.value))}
          />
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={portfolioData.projectedGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="properties" 
              stroke="#4f46e5" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-sm text-gray-600">Current Properties</p>
          <p className="text-lg font-semibold">{portfolioData.currentProperties}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Projected EOY</p>
          <p className="text-lg font-semibold">{portfolioData.projectedEndOfYear}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Growth Rate</p>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <p className="text-lg font-semibold text-green-600">
              {portfolioData.growthRate}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}