import { create } from 'zustand';

interface Mission {
  text: string;
}

export interface Objective {
  id: string;
  title: string;
  percentage: number;
}

interface Perspective {
  title: string;
  color: string;
  objectives: Objective[];
}

interface StrategyMapState {
  mission: Mission;
  perspectives: Record<string, Perspective>;
  updateMission: (text: string) => void;
  updateObjectivePercentage: (perspectiveId: string, objectiveId: string, percentage: number) => void;
}

export const useStrategyMapStore = create<StrategyMapState>((set) => ({
  mission: {
    text: "Providing exceptional hospitality in the most desired destinations."
  },
  perspectives: {
    financial: {
      title: 'Financial',
      color: 'blue',
      objectives: [
        { id: 'f1', title: 'F1: Planned Growth', percentage: 10 }
      ]
    },
    customer: {
      title: 'Customer',
      color: 'indigo',
      objectives: [
        { id: 'c1', title: 'C1: Ensure Owners\' Success', percentage: 20 },
        { id: 'c2', title: 'C2: Make Every Rental Feel Like Home', percentage: 20 }
      ]
    },
    internal: {
      title: 'Internal',
      color: 'purple',
      objectives: [
        { id: 'i1', title: 'I1: Great Customer Service', percentage: 10 },
        { id: 'i2', title: 'I2: Operational Excellence', percentage: 10 },
        { id: 'i3', title: 'I3: Control Cost', percentage: 5 }
      ]
    },
    enablers: {
      title: 'Enablers',
      color: 'emerald',
      objectives: [
        { id: 'e1', title: 'E1: Live Our Values', percentage: 10 },
        { id: 'e2', title: 'E2: Leverage Technology', percentage: 15 }
      ]
    }
  },
  updateMission: (text: string) => 
    set((state) => ({ mission: { text } })),
  updateObjectivePercentage: (perspectiveId: string, objectiveId: string, percentage: number) =>
    set((state) => ({
      perspectives: {
        ...state.perspectives,
        [perspectiveId]: {
          ...state.perspectives[perspectiveId],
          objectives: state.perspectives[perspectiveId].objectives.map(obj =>
            obj.id === objectiveId ? { ...obj, percentage } : obj
          )
        }
      }
    }))
}));