import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { analyticsData } from '../../data/analyticsData';

export function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold">Revenue Performance</h3>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">+12.5% vs last month</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={analyticsData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#16a34a" 
              fill="#dcfce7" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-lg font-semibold">$124,500</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Average Daily Rate</p>
          <p className="text-lg font-semibold">$245</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">RevPAR</p>
          <p className="text-lg font-semibold">$198</p>
        </div>
      </div>
    </div>
  );
}