import React from 'react';
import { Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { analyticsData } from '../../data/analyticsData';

export function BookingTrends() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-purple-600" />
        <h3 className="font-semibold">Booking Trends</h3>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analyticsData.weeklyBookings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#9333ea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-sm text-gray-600">Advance Bookings</p>
          <p className="text-lg font-semibold">45 days avg</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Booking Pace</p>
          <p className="text-lg font-semibold">+15% YoY</p>
        </div>
      </div>
    </div>
  );
}