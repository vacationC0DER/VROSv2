import { create } from 'zustand';
import { addMonths, format } from 'date-fns';
import { useForecasting } from './useForecasting';
import { useRevenueDynamics } from './useRevenueDynamics';
import { useFeeStructure } from './useFeeStructure';
import { useStaffPayroll } from './useStaffPayroll';
import { useOperatingExpenses } from './useOperatingExpenses';
import {
  calculateRevenueNights,
  calculateGrossRent,
  calculateTotalCharges,
  calculateMonthlyExpenses,
  calculateMonthlyProfits,
  calculateAnnualMetrics
} from '../utils/calculations';

interface FinancialProjectionsState {
  projections: {
    monthlyData: Array<{
      month: string;
      properties: number;
      revenue: number;
      expenses: number;
      profit: number;
    }>;
    annualMetrics: {
      annualRevenue: number;
      annualExpenses: number;
      netProfit: number;
      profitMargin: number;
    };
  };
  calculateProjections: () => void;
}

export const useFinancialProjections = create<FinancialProjectionsState>((set) => {
  return {
    projections: {
      monthlyData: [],
      annualMetrics: {
        annualRevenue: 0,
        annualExpenses: 0,
        netProfit: 0,
        profitMargin: 0
      }
    },

    calculateProjections: () => {
      // Get latest data from other stores
      const portfolioData = useForecasting.getState().portfolioData;
      const revenueMetrics = useRevenueDynamics.getState().metrics;
      const fees = useFeeStructure.getState().fees;
      const payroll = useStaffPayroll.getState().totalPayroll;
      const opex = useOperatingExpenses.getState().totals;

      const monthlyData = Array.from({ length: 12 }, (_, i) => {
        const date = addMonths(new Date(), i);
        
        // Calculate properties
        const properties = Math.max(
          portfolioData.currentProperties + 
          (portfolioData.newPropertiesPerMonth - portfolioData.offboardedPropertiesPerMonth) * i,
          0
        );

        // Calculate revenue
        const revenueNights = calculateRevenueNights(properties, 30, revenueMetrics.paidOccupancy);
        const grossRent = calculateGrossRent(revenueNights, revenueMetrics.averageDailyRate);
        const cleaningFees = (revenueNights / revenueMetrics.lengthOfStay) * fees.guestCleaningFee;
        
        const revenue = calculateTotalCharges(
          grossRent,
          cleaningFees,
          fees.bookingFeePercent,
          fees.damageWaiver,
          fees.taxPercent
        );

        // Calculate expenses
        const expenses = calculateMonthlyExpenses(
          payroll.totalMonthly,
          opex.totalMonthly,
          properties,
          500 // Base cost per property
        );
        
        // Calculate profit
        const profit = calculateMonthlyProfits(revenue, expenses);

        return {
          month: format(date, 'MMM'),
          properties,
          revenue,
          expenses,
          profit
        };
      });

      // Calculate annual metrics
      const annualMetrics = calculateAnnualMetrics(monthlyData);

      set({ projections: { monthlyData, annualMetrics } });
    }
  };
});