import React from 'react';
import { PropertyPortfolio } from '../components/forecasting/PropertyPortfolio';
import { RevenueDynamics } from '../components/forecasting/RevenueDynamics';
import { FeeStructure } from '../components/forecasting/FeeStructure';
import { StaffPayroll } from '../components/forecasting/StaffPayroll';
import { OperatingExpenses } from '../components/forecasting/OperatingExpenses';
import { FinancialProjections } from '../components/forecasting/FinancialProjections';

export function Forecasting() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Financial Forecasting</h1>
        <p className="mt-2 text-lg text-gray-600">
          Track, analyze, and forecast your vacation rental business performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <PropertyPortfolio />
        <RevenueDynamics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <FeeStructure />
        <StaffPayroll />
      </div>

      <div className="space-y-8">
        <OperatingExpenses />
        <FinancialProjections />
      </div>
    </div>
  );
}