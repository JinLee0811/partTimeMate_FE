// useAdminStore.ts
import { create } from "zustand";
import { fetchUsersApi, updateUserByIdApi, deleteUserByIdApi } from "../api/adminApi";
import { User } from "../types/user";

interface AdminStoreState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  updateUser: (userId: string, updatedData: Partial<User>) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

export const useAdminStore = create<AdminStoreState>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await fetchUsersApi();
      set({ users });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch users." });
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (userId: string, updatedData: Partial<User>) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await updateUserByIdApi(userId, updatedData);
      set((state) => ({
        users: state.users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to update user." });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      await deleteUserByIdApi(userId);
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to delete user." });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
