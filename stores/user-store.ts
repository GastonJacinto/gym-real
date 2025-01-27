import { User } from '@/types/db-types';
import { create } from 'zustand';

export interface Users {
  users: User[] | [];
}

export type Actions = {
  updateUsers: (users: User[]) => void;
  setUsers: (users: User[]) => void;
};
export const useUserStore = create<Users & Actions>((set) => ({
  users: [],
  updateUsers: (users: User[]) => set({ users }),
  setUsers: (users: User[]) => set({ users }),
}));
