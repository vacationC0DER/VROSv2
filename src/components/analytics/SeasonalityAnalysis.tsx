import React from 'react';
import { CalendarDays } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { analyticsData } from '../../data/analyticsData';

export function SeasonalityAnalysis() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <CalendarDays className="h-5 w-5 text-teal-600" />
        <h3 className="font-semibold">Seasonality Analysis</h3>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={analyticsData.seasonality}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="revenue" 
              fill="#0d9488" 
              name="Revenue" 
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="occupancy"
              stroke="#14b8a6"
              name="Occupancy %"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-sm text-gray-600">Peak Season</p>
          <p className="text-lg font-semibold">Jun-Aug</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Low Season</p>
          <p className="text-lg font-semibold">Jan-Mar</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Seasonal Variance</p>
          <p className="text-lg font-semibold">42%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Year-Round Score</p>
          <p className="text-lg font-semibold">7.8/10</p>
        </div>
      </div>
    </div>
  );
}