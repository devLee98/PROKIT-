import { create } from 'zustand';

interface IsTimerStore {
  isRunning: boolean;
  setIsRunning: (v: boolean) => void;
}

export const useTimerStore = create<IsTimerStore>((set) => ({
  isRunning: false,
  setIsRunning: (v) => set({ isRunning: v }),
}));

useTimerStore.subscribe((state) => {
  localStorage.setItem('isRunning', JSON.stringify(state.isRunning));
});
