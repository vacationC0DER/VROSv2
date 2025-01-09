import { create } from 'zustand';

interface RevenueDynamics {
  metrics: {
    averageDailyRate: number;
    lengthOfStay: number;
    paidOccupancy: number;
    nonRevenueOccupancy: number;
  };
  seasonalityData: Array<{
    month: string;
    multiplier: number;
  }>;
  calculatedMetrics: {
    revPAR: number;
    totalOccupancy: number;
    revenuePerStay: number;
  };
  updateMetric: (field: string, value: number) => void;
  calculateMetrics: () => void;
}

export const useRevenueDynamics = create<RevenueDynamics>((set, get) => ({
  metrics: {
    averageDailyRate: 250,
    lengthOfStay: 4,
    paidOccupancy: 75,
    nonRevenueOccupancy: 5
  },
  seasonalityData: [
    { month: 'Jan', multiplier: 0.8 },
    { month: 'Feb', multiplier: 0.9 },
    { month: 'Mar', multiplier: 1.0 },
    { month: 'Apr', multiplier: 1.1 },
    { month: 'May', multiplier: 1.2 },
    { month: 'Jun', multiplier: 1.4 },
    { month: 'Jul', multiplier: 1.5 },
    { month: 'Aug', multiplier: 1.4 },
    { month: 'Sep', multiplier: 1.2 },
    { month: 'Oct', multiplier: 1.1 },
    { month: 'Nov', multiplier: 0.9 },
    { month: 'Dec', multiplier: 1.3 }
  ],
  calculatedMetrics: {
    revPAR: 0,
    totalOccupancy: 0,
    revenuePerStay: 0
  },

  updateMetric: (field, value) => {
    set(state => ({
      metrics: {
        ...state.metrics,
        [field]: value
      }
    }));
    get().calculateMetrics();
  },

  calculateMetrics: () => {
    const { averageDailyRate, lengthOfStay, paidOccupancy, nonRevenueOccupancy } = get().metrics;
    
    const totalOccupancy = Math.min(paidOccupancy + nonRevenueOccupancy, 100);
    const revPAR = Math.round(averageDailyRate * (paidOccupancy / 100));
    const revenuePerStay = Math.round(averageDailyRate * lengthOfStay);

    set({
      calculatedMetrics: {
        revPAR,
        totalOccupancy,
        revenuePerStay
      }
    });
  }
}));