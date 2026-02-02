import { create } from 'zustand';

export type OnboardingStatus = 'BASIC' | 'CHARACTERISTIC' | 'DONE';

export interface User {
  userId: string;
  nickname: string | null;
  gender: string | null;
  ageGroup: string | null;
  imagePath: string | null;
  onboardingStep: OnboardingStatus;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  updateOnboardingStep: (status: OnboardingStatus) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  isInitialized: false,

  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),
  updateOnboardingStep: (status) =>
    set((state) => ({
      user: state.user ? { ...state.user, onboardingStep: status } : null,
    })),
  reset: () => set({ user: null, isLoading: false, isInitialized: false }),
}));
