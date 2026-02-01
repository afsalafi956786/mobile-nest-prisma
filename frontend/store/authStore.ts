import { apiFetch } from "@/service/api";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  user: any | null;
  setAuth: (user: any) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setAuth: (user) => set({ user }),
      logout: async () => {
        try {
          await apiFetch.post("/auth/logout", {}); // clear cookie
        } catch (err:any) {
           toast.error(err?.message || 'Failed to logout');
        } finally {
          set({ user: null }); // clear Zustand state
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
