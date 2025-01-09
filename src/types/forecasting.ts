export interface MonthlyProjection {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  properties: number;
}

export interface AnnualMetrics {
  annualRevenue: number;
  annualExpenses: number;
  netProfit: number;
  profitMargin: number;
}

export interface StaffMember {
  id: string;
  position: string;
  payType: 'salary' | 'hourly';
  payRate: number;
  startDate: string;
  benefits: {
    healthInsurance: number;
    retirement: number;
    otherBenefits: number;
  };
  monthlyCost: number;
}

export interface OperatingExpenses {
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