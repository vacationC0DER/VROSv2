import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface StaffMember {
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

interface StaffPayrollState {
  staff: StaffMember[];
  totalPayroll: {
    monthlyPayroll: number;
    monthlyBenefits: number;
    monthlyTaxes: number;
    totalMonthly: number;
  };
  addStaffMember: (member: Omit<StaffMember, 'id' | 'monthlyCost'>) => void;
  removeStaffMember: (id: string) => void;
  editStaffMember: (member: StaffMember) => void;
  calculatePayroll: () => void;
}

export const useStaffPayroll = create<StaffPayrollState>((set, get) => ({
  staff: [],
  totalPayroll: {
    monthlyPayroll: 0,
    monthlyBenefits: 0,
    monthlyTaxes: 0,
    totalMonthly: 0
  },

  addStaffMember: (member) => {
    const monthlyCost = calculateMonthlyCost(member);
    const newMember = {
      ...member,
      id: uuidv4(),
      monthlyCost
    };

    set(state => ({
      staff: [...state.staff, newMember]
    }));
    get().calculatePayroll();
  },

  removeStaffMember: (id) => {
    set(state => ({
      staff: state.staff.filter(member => member.id !== id)
    }));
    get().calculatePayroll();
  },

  editStaffMember: (member) => {
    set(state => ({
      staff: state.staff.map(m => 
        m.id === member.id ? { ...member, monthlyCost: calculateMonthlyCost(member) } : m
      )
    }));
    get().calculatePayroll();
  },

  calculatePayroll: () => {
    const { staff } = get();
    
    const monthlyPayroll = staff.reduce((total, member) => {
      if (member.payType === 'salary') {
        return total + (member.payRate / 12);
      } else {
        // Assume 40 hours/week, 52 weeks/year
        return total + ((member.payRate * 40 * 52) / 12);
      }
    }, 0);

    const monthlyBenefits = staff.reduce((total, member) => {
      return total + Object.values(member.benefits).reduce((sum, benefit) => sum + benefit, 0);
    }, 0);

    // Assume 20% for taxes and other payroll expenses
    const monthlyTaxes = monthlyPayroll * 0.2;

    const totalMonthly = monthlyPayroll + monthlyBenefits + monthlyTaxes;

    set({ totalPayroll: {
      monthlyPayroll,
      monthlyBenefits,
      monthlyTaxes,
      totalMonthly
    }});
  }
}));

function calculateMonthlyCost(member: Omit<StaffMember, 'id' | 'monthlyCost'>): number {
  const monthlyPay = member.payType === 'salary' 
    ? member.payRate / 12 
    : (member.payRate * 40 * 52) / 12;

  const monthlyBenefits = Object.values(member.benefits).reduce((sum, benefit) => sum + benefit, 0);
  const monthlyTaxes = monthlyPay * 0.2;

  return monthlyPay + monthlyBenefits + monthlyTaxes;
}