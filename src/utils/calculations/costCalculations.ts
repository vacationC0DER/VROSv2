import { CONSTANTS } from './index';

// Calculate labor costs
export function calculateLaborCosts(
  properties: number,
  cleaningCostPerTurn: number,
  maintenanceCostPerProperty: number
): number {
  const cleaningCosts = properties * cleaningCostPerTurn;
  const maintenanceCosts = properties * maintenanceCostPerProperty;
  return Math.round(cleaningCosts + maintenanceCosts);
}

// Calculate operating expenses
export function calculateOperatingExpenses(
  properties: number,
  fixedCosts: {
    rent: number;
    utilities: number;
    software: number;
    insurance: number;
  },
  variableCosts: {
    marketing: number;
    supplies: number;
    travel: number;
  }
): number {
  const totalFixed = Object.values(fixedCosts).reduce((sum, cost) => sum + cost, 0);
  const totalVariablePerProperty = Object.values(variableCosts).reduce((sum, cost) => sum + cost, 0);
  
  return Math.round(totalFixed + (properties * totalVariablePerProperty));
}

// Calculate payroll costs
export function calculatePayrollCosts(
  salaries: number[],
  hourlyRates: { rate: number; hours: number }[]
): number {
  const totalSalaries = salaries.reduce((sum, salary) => sum + salary, 0);
  const totalHourly = hourlyRates.reduce((sum, { rate, hours }) => 
    sum + (rate * hours * CONSTANTS.WEEKS_IN_YEAR / 12), 0);
  
  const baseCost = totalSalaries + totalHourly;
  const taxesAndBenefits = baseCost * (CONSTANTS.TAX_RATE + CONSTANTS.BENEFITS_RATE);
  
  return Math.round(baseCost + taxesAndBenefits);
}