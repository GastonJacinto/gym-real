import { User } from '@/types/db-types';
import { create } from 'zustand';

export interface Users {
  users: User[] | [];
}

export type Actions = {
  setUsers: (users: User[]) => void;
  updateUser: (updatedUser: User) => void;
  removeUser: (id: string) => void;
};

export const useUserStore = create<Users & Actions>((set) => ({
  users: [],

  setUsers: (users: User[]) => set({ users }),
  removeUser: (id: string) => {
    if (!id) return;
    return set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
  updateUser: (updatedUser: User) =>
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      return { users: updatedUsers };
    }),
}));
