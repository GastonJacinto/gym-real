import { Manager } from '@/types/db-types';
import { create } from 'zustand';

export interface ManagerStore {
  manager: Manager | null;
}

export type Actions = {
  setManager: (manager: Manager) => void;
  updateManager: (manager: Manager) => void;
};
export const useManagerStore = create<ManagerStore & Actions>((set) => ({
  manager: null,
  setManager: (manager) => set({ manager }),
  updateManager: (manager) => set({ manager }),
}));
