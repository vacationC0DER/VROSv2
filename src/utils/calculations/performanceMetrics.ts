// Calculate RevPAR (Revenue Per Available Room)
export function calculateRevPAR(
  totalRevenue: number,
  totalProperties: number,
  daysInPeriod: number
): number {
  return Math.round(totalRevenue / (totalProperties * daysInPeriod));
}

// Calculate ADR (Average Daily Rate)
export function calculateADR(
  totalRevenue: number,
  occupiedNights: number
): number {
  return Math.round(totalRevenue / occupiedNights);
}

// Calculate occupancy metrics
export function calculateOccupancyMetrics(
  occupiedNights: number,
  availableNights: number
): {
  occupancyRate: number;
  averageLengthOfStay: number;
} {
  return {
    occupancyRate: Math.round((occupiedNights / availableNights) * 100),
    averageLengthOfStay: Math.round(occupiedNights / (availableNights * 0.3)) // Assuming 30% turnover
  };
}

// Calculate growth metrics
export function calculateGrowthMetrics(
  currentValue: number,
  previousValue: number
): {
  absoluteGrowth: number;
  percentageGrowth: number;
} {
  const absoluteGrowth = currentValue - previousValue;
  const percentageGrowth = previousValue === 0 ? 0 : 
    Math.round((absoluteGrowth / previousValue) * 100);

  return {
    absoluteGrowth,
    percentageGrowth
  };
}