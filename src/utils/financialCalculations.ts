import { addMonths, format } from 'date-fns';
import type { MonthlyProjection, AnnualMetrics } from '../types/forecasting';

export function calculateMonthlyProjections(
  currentProperties: number,
  newPropertiesPerMonth: number,
  offboardedPropertiesPerMonth: number,
  averageDailyRate: number,
  paidOccupancy: number,
  monthlyPayroll: number,
  monthlyOpex: number
): MonthlyProjection[] {
  const monthlyData: MonthlyProjection[] = [];
  let properties = currentProperties;

  for (let i = 0; i < 12; i++) {
    const date = addMonths(new Date(), i);
    properties += newPropertiesPerMonth - offboardedPropertiesPerMonth;

    // Calculate revenue based on properties and occupancy
    const revenue = properties * averageDailyRate * (paidOccupancy / 100) * 30;
    
    // Calculate expenses including payroll and operating expenses
    const expenses = monthlyPayroll + monthlyOpex;
    
    // Calculate profit
    const profit = revenue - expenses;

    monthlyData.push({
      month: format(date, 'MMM'),
      revenue,
      expenses,
      profit,
      properties
    });
  }

  return monthlyData;
}

export function calculateAnnualMetrics(monthlyData: MonthlyProjection[]): AnnualMetrics {
  const annualRevenue = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
  const annualExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0);
  const netProfit = annualRevenue - annualExpenses;
  const profitMargin = Math.round((netProfit / annualRevenue) * 100);

  return {
    annualRevenue,
    annualExpenses,
    netProfit,
    profitMargin
  };
}