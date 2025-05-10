import { create } from "zustand";
import { fetchUsersApi, updateUserByIdApi, deleteUserByIdApi } from "../api/adminApi";
import { User } from "../types/user";

interface UsersResponse {
  users: User[];
  totalCount: number;
  totalPage: number;
  page: number;
}

interface AdminStoreState {
  users: User[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  fetchUsers: (page?: number) => Promise<void>;
  updateUser: (userId: string, updatedData: Partial<User>) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

export const useAdminStore = create<AdminStoreState>((set, get) => ({
  users: [],
  totalCount: 0,
  totalPage: 1,
  currentPage: 1,
  loading: false,
  error: null,

  fetchUsers: async (page: number = 1) => {
    set({ loading: true, error: null });
    try {
      const response: UsersResponse = await fetchUsersApi(page);
      set({
        users: response.users,
        totalCount: response.totalCount,
        totalPage: response.totalPage,
        currentPage: response.page,
      });
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
