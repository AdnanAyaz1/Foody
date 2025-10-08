import { User } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  fetchAuthenticatedUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setLoading: (value) => set({ isLoading: value }),

  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      set({ isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      const res = await fetch(`/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("data", data.data);
      if (data.success) {
        const user = data.data;
        set({
          user: {
            name: user.name,
            email: user.email,
            avatar: user.image,
          },
          isAuthenticated: true,
          isLoading: false,
        });
      } else set({ isAuthenticated: false, user: null });
    } catch (e) {
      console.log(e);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
