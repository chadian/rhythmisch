import React from 'react';
import { ReactChildrenProps } from '../../types';

export function SectionHeading({ children }: ReactChildrenProps) {
  return <h3 className="text-3xl text-gray-800 font-bold mb-4">{children}</h3>;
}

export function SectionParagraph({ children }: ReactChildrenProps) {
  return <p className="text-2xl text-gray-700">{children}</p>;
}
