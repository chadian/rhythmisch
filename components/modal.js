import React from 'react';
import FocusLock from 'react-focus-lock';

export default function Modal({ children, onClose }) {
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

  const onKeyDown = (e) => {
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
