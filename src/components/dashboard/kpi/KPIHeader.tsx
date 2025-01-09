import React from 'react';
import { Calendar } from 'lucide-react';

export function KPIHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-semibold">Key Performance Indicators</h2>
        <p className="text-sm text-gray-600">Real-time performance metrics</p>
      </div>
      
      <div className="flex items-center gap-2">
        <select className="px-3 py-1.5 border rounded-lg text-sm">
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
        
        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
          <Calendar className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}