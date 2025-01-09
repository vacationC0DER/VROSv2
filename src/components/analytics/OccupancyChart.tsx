import React from 'react';
import { Home, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { analyticsData } from '../../data/analyticsData';

export function OccupancyChart() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold">Occupancy Rates</h3>
        </div>
        <div className="flex items-center gap-2 text-blue-600">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">+8.3% vs last month</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analyticsData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="occupancy" 
              stroke="#2563eb" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-sm text-gray-600">Average Occupancy</p>
          <p className="text-lg font-semibold">78%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Weekend Occupancy</p>
          <p className="text-lg font-semibold">92%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Weekday Occupancy</p>
          <p className="text-lg font-semibold">65%</p>
        </div>
      </div>
    </div>
  );
}