/* eslint-disable react/prop-types */
import React, { PropsWithChildren } from 'react';
import { default as NextLink } from 'next/link';
import { useTheme } from '../hooks/theme/index';
import cc from 'classcat';

const underlineClassNames = {
  sm: 'underline-offset-sm',
  md: 'underline-offset-md',
};

type LinkProps = {
  attrs?: { [attrName: string]: string };
  href: string;
  underline?: boolean;
  underlineOffset?: keyof typeof underlineClassNames;
};

const Link = ({
  attrs,
  href,
  underline,
  underlineOffset,
  children,
}: PropsWithChildren<LinkProps>) => {
  const [theme] = useTheme();

  attrs = attrs ?? {};
  underline = underline ?? true;
  href = href ?? attrs.href;
  const underlineOffsetClassName =
    underlineClassNames[underlineOffset] ?? underlineClassNames.sm;

  const classNames = (attrs.className ?? '').split(' ');

  classNames.push(
    'cursor-pointer',
    'underline-thickness-thin',
    theme.linkColor
  );

  if (underline) {
    classNames.push('underline');
    classNames.push(underlineOffsetClassName);
  }

  return (
    <NextLink passHref={true} href={href}>
      <a {...attrs} className={cc(classNames)}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
