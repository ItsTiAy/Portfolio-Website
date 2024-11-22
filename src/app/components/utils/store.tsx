import { create } from "zustand";

interface Store {
    animationsEnabled: boolean;
    backgroundEnabled: boolean;
    setAnimationsEnabled: (enabled: boolean) => void;
    setBackgroundEnabled: (enabled: boolean) => void;
}

export const useStore = create<Store>((set) => ({
    animationsEnabled: true, // default state
    backgroundEnabled: true, // default state
    setAnimationsEnabled: (enabled) => set(() => ({ animationsEnabled: enabled })),
    setBackgroundEnabled: (enabled) => set(() => ({ backgroundEnabled: enabled })),
}));