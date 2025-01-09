import { create } from 'zustand';

interface OperatingExpenses {
  facilityCosts: {
    officeRent: number;
    utilities: number;
  };
  technologyCosts: {
    propertyManagementSoftware: number;
    smartLockSubscriptions: number;
    otherTechnologyFees: number;
  };
  marketingCosts: {
    marketingBudget: number;
    customerAcquisitionCosts: number;
  };
  insurance: {
    liability: number;
    workersComp: number;
    propertyInsurance: number;
  };
  mileageRate: number;
  estimatedMonthlyMiles: number;
  travelBudget: number;
  mealsAndEntertainment: number;
}

interface OpexState {
  expenses: OperatingExpenses;
  totals: {
    monthlyFixed: number;
    monthlyVariable: number;
    totalMonthly: number;
    annualProjection: number;
  };
  updateExpense: (path: string[], value: number) => void;
  calculateTotals: () => void;
}

export const useOperatingExpenses = create<OpexState>((set, get) => ({
  expenses: {
    facilityCosts: {
      officeRent: 5000,
      utilities: 800
    },
    technologyCosts: {
      propertyManagementSoftware: 1200,
      smartLockSubscriptions: 500,
      otherTechnologyFees: 300
    },
    marketingCosts: {
      marketingBudget: 3000,
      customerAcquisitionCosts: 1500
    },
    insurance: {
      liability: 2000,
      workersComp: 1500,
      propertyInsurance: 3000
    },
    mileageRate: 0.65,
    estimatedMonthlyMiles: 2000,
    travelBudget: 1500,
    mealsAndEntertainment: 800
  },
  totals: {
    monthlyFixed: 0,
    monthlyVariable: 0,
    totalMonthly: 0,
    annualProjection: 0
  },

  updateExpense: (path, value) => {
    set(state => {
      const newExpenses = { ...state.expenses };
      let current: any = newExpenses;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;

      return { expenses: newExpenses };
    });
    get().calculateTotals();
  },

  calculateTotals: () => {
    const { expenses } = get();
    
    // Fixed costs
    const fixedCosts = 
      expenses.facilityCosts.officeRent +
      expenses.facilityCosts.utilities +
      expenses.technologyCosts.propertyManagementSoftware +
      expenses.technologyCosts.smartLockSubscriptions +
      expenses.insurance.liability +
      expenses.insurance.workersComp +
      expenses.insurance.propertyInsurance;

    // Variable costs
    const mileageCost = expenses.mileageRate * expenses.estimatedMonthlyMiles;
    const variableCosts = 
      expenses.marketingCosts.marketingBudget +
      expenses.marketingCosts.customerAcquisitionCosts +
      expenses.technologyCosts.otherTechnologyFees +
      expenses.travelBudget +
      expenses.mealsAndEntertainment +
      mileageCost;

    const totalMonthly = fixedCosts + variableCosts;
    const annualProjection = totalMonthly * 12;

    set({
      totals: {
        monthlyFixed: fixedCosts,
        monthlyVariable: variableCosts,
        totalMonthly,
        annualProjection
      }
    });
  }
}));