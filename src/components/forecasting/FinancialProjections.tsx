import React, { useEffect } from 'react';
import { Calculator, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { ProjectionsChart } from './projections/ProjectionsChart';
import { ProjectionsTable } from './projections/ProjectionsTable';
import { ProjectionsMetrics } from './projections/ProjectionsMetrics';
import { ValidationOverlay } from './ValidationOverlay';
import { useFinancialProjections } from '../../hooks/useFinancialProjections';

export function FinancialProjections() {
  const { projections, calculateProjections } = useFinancialProjections();

  useEffect(() => {
    calculateProjections();
  }, [calculateProjections]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Calculator className="h-5 w-5 text-indigo-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Financial Projections</h2>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Last updated:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <ValidationOverlay />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Annual Revenue"
            value={projections.annualMetrics.annualRevenue}
            change={12.5}
            trend="up"
            icon={DollarSign}
          />
          <MetricCard
            title="Annual Expenses"
            value={projections.annualMetrics.annualExpenses}
            change={8.2}
            trend="up"
            icon={TrendingUp}
          />
          <MetricCard
            title="Net Profit"
            value={projections.annualMetrics.netProfit}
            change={15.3}
            trend="up"
            icon={TrendingDown}
          />
        </div>

        <ProjectionsChart projections={projections.monthlyData} />
        <ProjectionsTable />
        <ProjectionsMetrics metrics={projections.annualMetrics} />
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ComponentType<any>;
}

function MetricCard({ title, value, change, trend, icon: Icon }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-gray-50 rounded-lg">
          <Icon className="h-5 w-5 text-gray-600" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span>{change}%</span>
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold mt-1">
        ${Math.round(value).toLocaleString()}
      </p>
    </div>
  );
}