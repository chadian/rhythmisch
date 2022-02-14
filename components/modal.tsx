import React, { KeyboardEventHandler } from 'react';
import FocusLock from 'react-focus-lock';
import { ReactChildrenProps } from '../types';

type ModalProps = {
  onClose: () => void;
};

export default function Modal({
  children,
  onClose,
}: ReactChildrenProps & ModalProps) {
  const classNames = [
    'fixed',
    'top-0',
    'left-0',
    'w-screen',
    'h-screen',
    'bg-white',
    'flex',
    'items-center',
    'justify-center',
    'z-30',
    'bg-filter-blur-modal',
  ];

  const onKeyDown: KeyboardEventHandler = (e) => {
    const ESCAPE = 27;

    if (e.keyCode === ESCAPE) {
      onClose();
    }
  };

  return (
    <FocusLock>
      <div
        role="dialog"
        aria-modal="true"
        className={classNames.join(' ')}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
    </FocusLock>
  );
}
