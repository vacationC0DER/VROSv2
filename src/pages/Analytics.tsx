import React from 'react';
import { RevenueChart } from '../components/analytics/RevenueChart';
import { OccupancyChart } from '../components/analytics/OccupancyChart';
import { PropertyMetrics } from '../components/analytics/PropertyMetrics';
import { BookingTrends } from '../components/analytics/BookingTrends';
import { MarketComparison } from '../components/analytics/MarketComparison';
import { SeasonalityAnalysis } from '../components/analytics/SeasonalityAnalysis';

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Business Analytics</h1>
        <p className="text-gray-600">Vacation rental performance metrics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PropertyMetrics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <OccupancyChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingTrends />
        <MarketComparison />
      </div>

      <SeasonalityAnalysis />
    </div>
  );
}