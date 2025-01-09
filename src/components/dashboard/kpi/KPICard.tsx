import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import type { KPI } from '../../../types/kpi';

interface KPICardProps {
  kpi: KPI;
  onDrillDown?: () => void;
}

export function KPICard({ kpi, onDrillDown }: KPICardProps) {
  const getTrendIcon = () => {
    switch (kpi.trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onDrillDown}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
        <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
      </div>
      
      <div className="flex items-end justify-between mb-3">
        <span className="text-2xl font-bold">{kpi.value}</span>
        <span className="text-sm text-gray-500">Target: {kpi.target}</span>
      </div>

      <div className="flex items-center gap-2">
        {getTrendIcon()}
        <span className={`text-sm ${
          kpi.trend === 'up' ? 'text-emerald-500' :
          kpi.trend === 'down' ? 'text-red-500' :
          'text-gray-500'
        }`}>
          {kpi.change}
        </span>
      </div>

      <div className="mt-3 pt-3 border-t">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${(Number(kpi.value.replace(/[^0-9.]/g, '')) / Number(kpi.target.replace(/[^0-9.]/g, ''))) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}