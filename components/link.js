/* eslint-disable react/prop-types */
import React from 'react';
import { default as NextLink } from 'next/link';
import { useTheme } from '../hooks/theme/index';

const underlineClassNames = {
  sm: 'underline-offset-sm',
  md: 'underline-offset-md',
};

export default function Link({
  attrs,
  href,
  underline,
  underlineOffset,
  children,
}) {
  const [theme] = useTheme();

  attrs = attrs ?? {};
  underline = underline ?? true;
  href = href ?? attrs.href;

  const classNames = (attrs.className ?? '').split(' ');

  classNames.push(
    'cursor-pointer',
    'underline-thickness-thin',
    theme.linkColor
  );

  if (underline) {
    classNames.push('underline');
    const underlineOffsetClassName =
      underlineClassNames[underlineOffset] ?? underlineClassNames.sm;
    classNames.push(underlineOffsetClassName);
  }

  const className = classNames.join(' ');

  return (
    <NextLink passHref={true} href={href}>
      <a {...attrs} className={className}>
        {children}
      </a>
    </NextLink>
  );
}
