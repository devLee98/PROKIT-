import { create } from 'zustand';

interface ErrorModalState {
  isOpen: boolean;
  message: string;
  showError: (message: string) => void;
  closeModal: () => void;
}

export const useErrorModalStore = create<ErrorModalState>((set) => ({
  isOpen: false,
  message: '',
  showError: (message: string) => set({ isOpen: true, message }),
  closeModal: () => set({ isOpen: false, message: '' }),
}));
