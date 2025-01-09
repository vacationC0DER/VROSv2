import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRevenueDynamics } from '../../../hooks/useRevenueDynamics';

export function MonthlySeasonality() {
  const { seasonalityData } = useRevenueDynamics();

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Monthly Seasonality</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={seasonalityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="multiplier" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}