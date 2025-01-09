import React from 'react';
import { Building } from 'lucide-react';
import { useOperatingExpenses } from '../../hooks/useOperatingExpenses';
import { FacilityCosts } from './opex/FacilityCosts';
import { TechnologyCosts } from './opex/TechnologyCosts';
import { MarketingCosts } from './opex/MarketingCosts';
import { InsuranceCosts } from './opex/InsuranceCosts';
import { TravelExpenses } from './opex/TravelExpenses';
import { OpexSummary } from './opex/OpexSummary';

export function OperatingExpenses() {
  const { totals } = useOperatingExpenses();

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Building className="h-5 w-5 text-orange-600" />
        <h2 className="font-semibold">Operating Expenses</h2>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <FacilityCosts />
        <TechnologyCosts />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <MarketingCosts />
        <InsuranceCosts />
      </div>

      <TravelExpenses />
      <OpexSummary totals={totals} />
    </div>
  );
}