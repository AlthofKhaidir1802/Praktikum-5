// src/store/authstore.js

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (username) => set({ user: { name: username } }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // simpan ke localStorage
    }
  )
);