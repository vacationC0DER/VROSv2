import React from 'react';
import { KPICard } from './KPICard';
import { useKPIStore } from '../../../stores/kpiStore';

export function KPIGrid() {
  const { kpis, selectedCategory } = useKPIStore();
  
  const filteredKPIs = selectedCategory
    ? kpis.filter(kpi => kpi.category === selectedCategory)
    : kpis;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {filteredKPIs.map((kpi) => (
        <KPICard
          key={kpi.id}
          kpi={kpi}
          onDrillDown={() => {
            // TODO: Implement drill-down view
            console.log('Drill down:', kpi.id);
          }}
        />
      ))}
    </div>
  );
}