// Calculate gross profit
export function calculateGrossProfit(revenue: number, directCosts: number): number {
  return Math.round(revenue - directCosts);
}

// Calculate operating profit
export function calculateOperatingProfit(
  grossProfit: number,
  operatingExpenses: number
): number {
  return Math.round(grossProfit - operatingExpenses);
}

// Calculate net profit
export function calculateNetProfit(
  operatingProfit: number,
  taxes: number,
  otherExpenses: number = 0
): number {
  return Math.round(operatingProfit - taxes - otherExpenses);
}

// Calculate monthly profits
export function calculateMonthlyProfits(
  revenue: number,
  expenses: number
): number {
  return Math.round(revenue - expenses);
}

// Calculate profit margins
export function calculateProfitMargins(
  revenue: number,
  grossProfit: number,
  operatingProfit: number,
  netProfit: number
): {
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
} {
  return {
    grossMargin: Math.round((grossProfit / revenue) * 100),
    operatingMargin: Math.round((operatingProfit / revenue) * 100),
    netMargin: Math.round((netProfit / revenue) * 100)
  };
}