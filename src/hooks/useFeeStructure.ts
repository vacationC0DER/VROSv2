import { create } from 'zustand';

interface FeeStructureState {
  fees: {
    guestCleaningFee: number;
    ownerCleaningFee: number;
    damageWaiver: number;
    bookingFeePercent: number;
    managementFeePercent: number;
    taxPercent: number;
  };
  calculatedFees: {
    averageFeePerStay: number;
    feePercentage: number;
    monthlyFeeRevenue: number;
  };
  updateFee: (field: string, value: number) => void;
  calculateFees: () => void;
}

export const useFeeStructure = create<FeeStructureState>((set, get) => ({
  fees: {
    guestCleaningFee: 150,
    ownerCleaningFee: 100,
    damageWaiver: 50,
    bookingFeePercent: 5,
    managementFeePercent: 25,
    taxPercent: 15
  },
  calculatedFees: {
    averageFeePerStay: 0,
    feePercentage: 0,
    monthlyFeeRevenue: 0
  },

  updateFee: (field, value) => {
    set(state => ({
      fees: {
        ...state.fees,
        [field]: value
      }
    }));
    get().calculateFees();
  },

  calculateFees: () => {
    const { 
      guestCleaningFee,
      ownerCleaningFee,
      damageWaiver,
      bookingFeePercent,
      managementFeePercent
    } = get().fees;

    // Sample calculations - in a real app, these would be more complex
    const averageFeePerStay = guestCleaningFee + damageWaiver + 
      (ownerCleaningFee * 0.1); // Assuming 10% of owner fees contribute to revenue

    const feePercentage = bookingFeePercent + managementFeePercent;

    // Assuming 20 stays per month for this example
    const monthlyFeeRevenue = averageFeePerStay * 20;

    set({
      calculatedFees: {
        averageFeePerStay: Math.round(averageFeePerStay),
        feePercentage: Math.round(feePercentage),
        monthlyFeeRevenue: Math.round(monthlyFeeRevenue)
      }
    });
  }
}));