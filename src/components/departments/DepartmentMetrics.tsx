import React from 'react';
import { BarChart2, TrendingUp, Users, CheckCircle } from 'lucide-react';

interface DepartmentMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

interface DepartmentMetricsProps {
  metrics: DepartmentMetric[];
}

export function DepartmentMetrics({ metrics }: DepartmentMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">{metric.label}</span>
            {index === 0 ? <BarChart2 className="h-5 w-5 text-gray-400" /> :
             index === 1 ? <TrendingUp className="h-5 w-5 text-gray-400" /> :
             index === 2 ? <Users className="h-5 w-5 text-gray-400" /> :
             <CheckCircle className="h-5 w-5 text-gray-400" />}
          </div>
          
          <p className="mt-2 text-2xl font-semibold text-gray-900">{metric.value}</p>
          
          <div className="mt-2 flex items-center gap-1">
            <span className={`text-sm ${
              metric.trend === 'up' ? 'text-green-600' :
              metric.trend === 'down' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {metric.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}