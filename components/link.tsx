/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import { default as NextLink } from 'next/link';
import { useTheme } from '../hooks/theme/index';

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

const Link: FunctionComponent<LinkProps> = ({
  attrs,
  href,
  underline,
  underlineOffset,
  children,
}) => {
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

  const className = classNames.join(' ');

  return (
    <NextLink passHref={true} href={href}>
      <a {...attrs} className={className}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
