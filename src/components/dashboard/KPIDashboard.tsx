import React, { useEffect } from 'react';
import { KPIHeader } from './kpi/KPIHeader';
import { KPIGrid } from './kpi/KPIGrid';
import { useKPIStore } from '../../stores/kpiStore';

export function KPIDashboard() {
  const { fetchKPIs, loading, error } = useKPIStore();

  useEffect(() => {
    fetchKPIs();
  }, [fetchKPIs]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        Error loading KPIs: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <KPIHeader />
      <KPIGrid />
    </div>
  );
}