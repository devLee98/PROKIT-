import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  message: string;
  showError: (message: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  message: '',
  showError: (message: string) => set({ isOpen: true, message }),
  closeModal: () => set({ isOpen: false, message: '' }),
}));
