import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  userName: string;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userName: "김건국",
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;