import { create } from "zustand";

interface Store {
    currentPage: number;
    animationsEnabled: boolean;
    backgroundEnabled: boolean;
    setCurrentPage: (value: number) => void;
    setAnimationsEnabled: (enabled: boolean) => void;
    setBackgroundEnabled: (enabled: boolean) => void;
}

export const useStore = create<Store>((set) => ({
    currentPage: 0,
    animationsEnabled: true,
    backgroundEnabled: true,
    setCurrentPage: (value) => set(() => ({ currentPage: value })),
    setAnimationsEnabled: (enabled) => set(() => ({ animationsEnabled: enabled })),
    setBackgroundEnabled: (enabled) => set(() => ({ backgroundEnabled: enabled })),
}));