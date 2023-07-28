import React from 'react';
import { useTheme } from '../hooks/theme/index';
import cc from 'classcat';

export default function Stripe() {
  const [theme] = useTheme();
  const { stripeBgClass } = theme;

  const className = cc([
    stripeBgClass,
    'absolute',
    'top-0',
    'right-0',
    'w-8',
    'md:w-12',
    'h-full',
    'z-20',
  ]);

  return (
    <div
      className={className}
    ></div>
  );
}
