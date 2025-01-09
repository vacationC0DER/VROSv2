import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MonthlyProjection } from '../../../types/forecasting';

interface ProjectionsChartProps {
  projections: MonthlyProjection[];
}

export function ProjectionsChart({ projections }: ProjectionsChartProps) {
  return (
    <div className="h-80 mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={projections}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar 
            yAxisId="left"
            dataKey="revenue" 
            fill="#4f46e5" 
            name="Revenue" 
          />
          <Bar 
            yAxisId="left"
            dataKey="expenses" 
            fill="#f97316" 
            name="Expenses" 
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="profit"
            stroke="#22c55e"
            name="Profit"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}