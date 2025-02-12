import { Profile, User, UserWithProfile } from '@/types/db-types';
import { create } from 'zustand';

export interface UsersState {
  user: UserWithProfile | null; // Logged user
  users: UserWithProfile[]; // List of users (managers)
}

export type Actions = {
  setUser: (user: UserWithProfile | null) => void;
  updateUser: (updatedUser: UserWithProfile) => void;
  removeUser: (id: string) => void;

  setUsers: (users: UserWithProfile[]) => void;
  updateUsers: (updatedUser: UserWithProfile) => void;
  removeUserFromList: (id: string) => void;
};

export const useUserStore = create<UsersState & Actions>((set) => ({
  user: null,
  users: [],

  // For logged in user
  setUser: (user: UserWithProfile | null) => set({ user }),
  updateUser: (updatedUser: UserWithProfile) =>
    set((state) => ({
      user: state.user?.id === updatedUser.id ? updatedUser : state.user,
    })),
  removeUser: () => set({ user: null }),

  //For managers
  setUsers: (users: UserWithProfile[]) => set({ users }),
  updateUsers: (updatedUser) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    }));
  },
  removeUserFromList: (userId) => {
    set((state) => {
      const updatedUsers = state.users.filter((user) => user.id !== userId);
      return { users: [...updatedUsers] };
    });
  },
}));
