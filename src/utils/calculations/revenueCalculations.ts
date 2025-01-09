import { CONSTANTS } from './index';

// Calculate total available nights
export function calculateAvailableNights(properties: number): number {
  return Math.round(properties * CONSTANTS.DAYS_IN_MONTH);
}

// Calculate revenue nights based on occupancy
export function calculateRevenueNights(
  availableNights: number,
  paidOccupancy: number,
  seasonalityMultiplier: number = 1
): number {
  return Math.round(availableNights * (paidOccupancy / 100) * seasonalityMultiplier);
}

// Calculate gross rental revenue
export function calculateGrossRent(
  revenueNights: number,
  averageDailyRate: number,
  seasonalityMultiplier: number = 1
): number {
  return Math.round(revenueNights * averageDailyRate * seasonalityMultiplier);
}

// Calculate cleaning revenue
export function calculateCleaningRevenue(
  revenueNights: number,
  averageStayLength: number,
  cleaningFee: number
): number {
  const numberOfStays = Math.round(revenueNights / averageStayLength);
  return numberOfStays * cleaningFee;
}

// Calculate total charges including fees and taxes
export function calculateTotalCharges(
  grossRent: number, 
  cleaningFees: number, 
  bookingFeePercent: number, 
  damageWaiver: number, 
  taxRate: number
): number {
  const bookingFees = grossRent * (bookingFeePercent / 100);
  const totalBeforeTax = grossRent + cleaningFees + bookingFees + damageWaiver;
  const taxes = totalBeforeTax * (taxRate / 100);
  return Math.round(totalBeforeTax + taxes);
}

// Calculate total revenue including all fees
export function calculateTotalRevenue(
  grossRent: number,
  cleaningRevenue: number,
  bookingFeePercent: number,
  managementFeePercent: number
): number {
  const bookingFees = grossRent * (bookingFeePercent / 100);
  const managementFees = grossRent * (managementFeePercent / 100);
  return Math.round(grossRent + cleaningRevenue + bookingFees + managementFees);
}