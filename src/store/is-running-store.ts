import { create } from 'zustand';

interface IsRunningStore {
  isRunning: boolean;
  setIsRunning: (v: boolean) => void;
}

export const useIsRunningStore = create<IsRunningStore>((set) => ({
  isRunning: false,
  setIsRunning: (v) => set({ isRunning: v }),
}));

useIsRunningStore.subscribe((state) => {
  localStorage.setItem('isRunning', JSON.stringify(state.isRunning));
});
