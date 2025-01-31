import { Plan } from '@/types/db-types';
import { create } from 'zustand';

export interface Plans {
  plans: Plan[] | [];
}

export type Actions = {
  setPlans: (plans: Plan[]) => void;
  updatePlan: (updatedPlan: Plan) => void;
};

export const usePlanStore = create<Plans & Actions>((set) => ({
  plans: [],

  setPlans: (plans: Plan[]) => set({ plans }),

  updatePlan: (updatedPlan: Plan) =>
    set((state) => {
      const updatedPlans = state.plans.map((plan) =>
        plan.id === updatedPlan.id ? updatedPlan : plan
      );
      return { plans: updatedPlans };
    }),
}));
