import React from 'react';
import { useTheme } from '../hooks/theme/index';

export default function Button({
  children,
  onClick = () => {},
  attrs = {},
  size = 'large',
}) {
  const [theme] = useTheme();
  const { buttonTextColor, buttonBgColor } = theme;

  const { className = '', type: buttonType, ...buttonAttrs } = attrs;

  const largeButtonClassNames = [
    buttonTextColor,
    buttonBgColor,
    'inline-block',
    'font-medium',
    'py-1.5',
    'text-lg',
    'md:text-xl',
  ];

  const smallButtonClassNames = [
    buttonTextColor,
    buttonBgColor,
    'inline-block',
    'font-medium',
    'py-1.5',
  ];

  const sizeClassName =
    size === 'large'
      ? largeButtonClassNames.join(' ')
      : smallButtonClassNames.join(' ');

  return (
    <button
      {...buttonAttrs}
      type={buttonType || 'button'}
      onClick={onClick}
      className={`${className} ${sizeClassName}`}
    >
      {children}
    </button>
  );
}
