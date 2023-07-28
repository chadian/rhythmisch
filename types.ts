import { ReactNode } from 'react';

export type ReactChildrenProps = { children: ReactNode };

export type Hit = Date;

export type Rhythm = {
  id: string;
  action: string;
  reason: string;
  frequency: [number, number];
  hits: Hit[];
};

export type UnsavedRhythm = Omit<Rhythm, 'id'>;
