import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useForecasting } from '../../hooks/useForecasting';
import { useRevenueDynamics } from '../../hooks/useRevenueDynamics';
import { useFeeStructure } from '../../hooks/useFeeStructure';
import { useStaffPayroll } from '../../hooks/useStaffPayroll';
import { useOperatingExpenses } from '../../hooks/useOperatingExpenses';

interface ValidationSection {
  title: string;
  fields: string[];
  isComplete: boolean;
}

export function ValidationOverlay() {
  const { portfolioData } = useForecasting();
  const { metrics: revenueMetrics } = useRevenueDynamics();
  const { fees } = useFeeStructure();
  const { staff } = useStaffPayroll();
  const { expenses: opex } = useOperatingExpenses();

  const validationSections: ValidationSection[] = [
    {
      title: 'Property Portfolio',
      fields: ['Current Properties', 'New Properties/Month'],
      isComplete: portfolioData.currentProperties > 0
    },
    {
      title: 'Revenue Dynamics',
      fields: ['Average Daily Rate', 'Paid Occupancy Rate', 'Length of Stay'],
      isComplete: revenueMetrics.averageDailyRate > 0 && revenueMetrics.paidOccupancy > 0
    },
    {
      title: 'Fee Structure',
      fields: ['Management Fee', 'Cleaning Fee', 'Booking Fee'],
      isComplete: fees.managementFeePercent > 0 && fees.guestCleaningFee > 0
    },
    {
      title: 'Staff & Payroll',
      fields: ['Staff Members', 'Payroll Costs'],
      isComplete: staff.length > 0
    },
    {
      title: 'Operating Expenses',
      fields: ['Facility Costs', 'Technology Costs', 'Insurance'],
      isComplete: opex.facilityCosts.officeRent > 0 && opex.insurance.liability > 0
    }
  ];

  const incompleteSections = validationSections.filter(section => !section.isComplete);

  if (incompleteSections.length === 0) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
        <div>
          <h3 className="font-medium text-yellow-800">Missing Required Information</h3>
          <p className="text-sm text-yellow-700 mt-1">
            Please complete the following sections to generate accurate financial projections:
          </p>
          <ul className="mt-3 space-y-2">
            {incompleteSections.map((section) => (
              <li key={section.title} className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <div>
                  <p className="font-medium text-yellow-800">{section.title}</p>
                  <p className="text-sm text-yellow-700">
                    Required fields: {section.fields.join(', ')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}