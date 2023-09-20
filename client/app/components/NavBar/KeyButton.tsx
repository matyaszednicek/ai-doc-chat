'use client';

import { useKeyModalContext } from '@/context/ModalContext';
import { KeyIcon } from '@heroicons/react/24/outline';

function KeyButton() {
  const { setOpened } = useKeyModalContext();

  return (
    <button
      type="button"
      onClick={() => setOpened(true)}
      className="hover:bg-[#b7b7b7] p-2 rounded-full transition-all duration-300"
    >
      <KeyIcon className="w-8" />
    </button>
  );
}

export default KeyButton;
