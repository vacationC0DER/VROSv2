import React from 'react';
import { StrategyMap } from '../components/dashboard/StrategyMap';
import { KPIDashboard } from '../components/dashboard/KPIDashboard';
import { DateDisplay } from '../components/dashboard/DateDisplay';

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Strategy Map</h1>
          <p className="text-gray-600">Track company performance and strategic objectives</p>
        </div>
        <DateDisplay />
      </div>
      
      <KPIDashboard />
      <StrategyMap />
    </div>
  );
}