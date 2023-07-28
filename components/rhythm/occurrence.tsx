import React, { MouseEventHandler } from 'react';
import { format } from 'date-fns';
import chroma from 'chroma-js';
import { useTheme } from '../../hooks/theme/index';
import { pullBackgroundColor } from '../../utils/pull-background-color';
import cc from 'classcat';

function createCooldownStyle(
  cooldown: number,
  themeMissClass: string,
  themeHitClass: string
) {
  // The fallbacks to #000 are for tests running in jest and jsdom
  // These fallbacks shouldn't be needed in browser environments
  const colorScaleStart = pullBackgroundColor(themeMissClass) || '#000';
  const colorScaleEnd = pullBackgroundColor(themeHitClass) || '#000';
  const scale = chroma
    .scale([colorScaleStart, colorScaleEnd])
    .gamma(1.25)
    .mode('lab');
  return { backgroundColor: scale(cooldown).hex() };
}

export default function Occurrence({
  cooldown,
  onClick,
  open,
  date,
}: {
  cooldown: number;
  onClick: MouseEventHandler;
  open: boolean;
  date: Date;
}) {
  const [theme] = useTheme();

  const {
    occurrenceOpenBgColor,
    occurrenceClosedHitBgColor,
    occurrenceClosedMissBgColor,
  } = theme;

  const occurrenceHit = cooldown === 1;
  const classNames = [
    'w-4',
    'h-4',
    'md:w-6',
    'md:h-6',
    'rounded-full',
    'inline-block',
  ];
  const formattedDate = format(date, 'MMMM do, yyyy');

  if (open) {
    const ariaLabel = occurrenceHit
      ? `Mark as missed on ${formattedDate}`
      : `Mark as hit on ${formattedDate}`;
    classNames.push(occurrenceOpenBgColor);

    if (!occurrenceHit) {
      classNames.push('filter-blur-occurrence-miss');
    }

    return (
      <button
        role="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className="flex p-4 -m-4"
      >
        <div className={cc(classNames)}></div>
      </button>
    );
  } else {
    const style = createCooldownStyle(
      cooldown,
      occurrenceClosedMissBgColor,
      occurrenceClosedHitBgColor
    );

    const ariaLabel = occurrenceHit
      ? `Hit target on ${formattedDate}`
      : `Missed target on ${formattedDate}`;

    return (
      <div
        role="img"
        aria-label={ariaLabel}
        style={style}
        className={cc(classNames)}
      ></div>
    );
  }
}
