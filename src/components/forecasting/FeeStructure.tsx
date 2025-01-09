import React from 'react';
import { Receipt } from 'lucide-react';
import { useFeeStructure } from '../../hooks/useFeeStructure';
import { FeeInput } from './fees/FeeInput';
import { FeeBreakdown } from './fees/FeeBreakdown';

export function FeeStructure() {
  const { fees, updateFee } = useFeeStructure();

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Receipt className="h-5 w-5 text-purple-600" />
        <h2 className="font-semibold">Fee Structure</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <FeeInput
          label="Guest Cleaning Fee"
          value={fees.guestCleaningFee}
          onChange={(value) => updateFee('guestCleaningFee', value)}
          prefix="$"
        />
        <FeeInput
          label="Owner Cleaning Fee"
          value={fees.ownerCleaningFee}
          onChange={(value) => updateFee('ownerCleaningFee', value)}
          prefix="$"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <FeeInput
          label="Damage Waiver Fee"
          value={fees.damageWaiver}
          onChange={(value) => updateFee('damageWaiver', value)}
          prefix="$"
        />
        <FeeInput
          label="Booking Fee"
          value={fees.bookingFeePercent}
          onChange={(value) => updateFee('bookingFeePercent', value)}
          suffix="%"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <FeeInput
          label="Management Fee"
          value={fees.managementFeePercent}
          onChange={(value) => updateFee('managementFeePercent', value)}
          suffix="%"
        />
        <FeeInput
          label="Tax Rate"
          value={fees.taxPercent}
          onChange={(value) => updateFee('taxPercent', value)}
          suffix="%"
        />
      </div>

      <FeeBreakdown />
    </div>
  );
}