interface MonthlyExpenses {
  month: string;
  expenses: number;
}

export function calculateMonthlyExpenses(
  monthlyPayroll: number,
  monthlyOpex: number,
  properties: number,
  variableCostPerProperty: number = 0
): number {
  const fixedExpenses = monthlyPayroll + monthlyOpex;
  const variableExpenses = properties * variableCostPerProperty;
  return Math.round(fixedExpenses + variableExpenses);
}

export function calculateExpenseProjections(
  monthlyPayroll: number,
  monthlyOpex: number,
  propertyProjections: Array<{ month: string; properties: number }>
): MonthlyExpenses[] {
  return propertyProjections.map(({ month, properties }) => ({
    month,
    expenses: calculateMonthlyExpenses(monthlyPayroll, monthlyOpex, properties)
  }));
}