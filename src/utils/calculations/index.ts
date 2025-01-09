// Core calculation functions
export * from './revenueCalculations';
export * from './costCalculations';
export * from './profitCalculations';
export * from './performanceMetrics';
export * from './expenseCalculations';

// Utility functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

// Calculate annual metrics from monthly data
export function calculateAnnualMetrics(monthlyData: Array<{
  revenue: number;
  expenses: number;
}>): {
  annualRevenue: number;
  annualExpenses: number;
  netProfit: number;
  profitMargin: number;
} {
  const annualRevenue = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
  const annualExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0);
  const netProfit = annualRevenue - annualExpenses;
  const profitMargin = annualRevenue > 0 ? Math.round((netProfit / annualRevenue) * 100) : 0;

  return {
    annualRevenue,
    annualExpenses,
    netProfit,
    profitMargin
  };
}

// Constants for calculations
export const CONSTANTS = {
  DAYS_IN_MONTH: 30.44, // Average days in a month
  WEEKS_IN_YEAR: 52,
  MONTHS_IN_YEAR: 12,
  HOURS_IN_WEEK: 40,
  TAX_RATE: 0.20, // 20% for payroll taxes
  BENEFITS_RATE: 0.25, // 25% for benefits
  BASE_COST_PER_PROPERTY: 500 // Base monthly cost per property
};