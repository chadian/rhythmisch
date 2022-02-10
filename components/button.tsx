/* eslint-disable react/prop-types */
import React, { MouseEventHandler } from 'react';
import { useTheme } from '../hooks/theme/index';
import { ReactChildrenProps } from '../types';

type ButtonProps = {
  onClick: MouseEventHandler;
  attrs?: Record<string, string> & { type?: 'button' | 'submit' };
  size: 'small' | 'large';
};

export default function Button({
  children,
  onClick = () => {},
  attrs = {},
  size = 'large',
}: ReactChildrenProps & ButtonProps) {
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
