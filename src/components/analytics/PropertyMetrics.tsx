import React from 'react';
import { Home, Users, Star, Calendar } from 'lucide-react';

export function PropertyMetrics() {
  const metrics = [
    {
      icon: <Home className="h-5 w-5 text-indigo-600" />,
      label: 'Total Properties',
      value: '245',
      change: '+12',
      trend: 'up'
    },
    {
      icon: <Users className="h-5 w-5 text-green-600" />,
      label: 'Active Guests',
      value: '156',
      change: '+28',
      trend: 'up'
    },
    {
      icon: <Star className="h-5 w-5 text-yellow-600" />,
      label: 'Avg Rating',
      value: '4.8',
      change: '+0.2',
      trend: 'up'
    }
  ];

  return (
    <>
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            {metric.icon}
            <h3 className="font-medium text-gray-900">{metric.label}</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-semibold">{metric.value}</p>
            <div className={`flex items-center gap-1 text-sm ${
              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{metric.change}</span>
              <span className="text-gray-500 text-xs">vs last month</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}