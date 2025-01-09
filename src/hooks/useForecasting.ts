import { create } from 'zustand';
import { addMonths, format } from 'date-fns';

interface ForecastingState {
  portfolioData: {
    currentProperties: number;
    newPropertiesPerMonth: number;
    offboardedPropertiesPerMonth: number;
    projectedGrowth: Array<{ month: string; properties: number }>;
    projectedEndOfYear: number;
    growthRate: number;
  };
  updatePortfolioData: (field: string, value: number) => void;
  calculateProjections: () => void;
}

export const useForecasting = create<ForecastingState>((set, get) => ({
  portfolioData: {
    currentProperties: 100,
    newPropertiesPerMonth: 5,
    offboardedPropertiesPerMonth: 1,
    projectedGrowth: [],
    projectedEndOfYear: 0,
    growthRate: 0
  },

  updatePortfolioData: (field, value) => {
    set(state => ({
      portfolioData: {
        ...state.portfolioData,
        [field]: value
      }
    }));
    get().calculateProjections();
  },

  calculateProjections: () => {
    const { currentProperties, newPropertiesPerMonth, offboardedPropertiesPerMonth } = get().portfolioData;
    const projectedGrowth = [];
    let monthlyProperties = currentProperties;

    // Calculate 12 months of projections
    for (let i = 0; i < 12; i++) {
      const date = addMonths(new Date(), i);
      monthlyProperties += newPropertiesPerMonth - offboardedPropertiesPerMonth;
      
      projectedGrowth.push({
        month: format(date, 'MMM'),
        properties: Math.max(0, monthlyProperties)
      });
    }

    const projectedEndOfYear = projectedGrowth[11].properties;
    const growthRate = ((projectedEndOfYear - currentProperties) / currentProperties) * 100;

    set(state => ({
      portfolioData: {
        ...state.portfolioData,
        projectedGrowth,
        projectedEndOfYear,
        growthRate: Math.round(growthRate * 10) / 10
      }
    }));
  }
}));