import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useModalStore } from '../../store/modal-store';

export function ErrorModal() {
  const { isOpen, message, closeModal } = useModalStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <div
        className="h-[144px] w-[328px] bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-6 px-6 py-6">
          <p className="text-md text-center text-gray-800">{message}</p>
          <button
            onClick={closeModal}
            className="w-full rounded-sm bg-[#4c79ff] px-4 py-3 text-white hover:bg-[#3a5fcc]"
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
