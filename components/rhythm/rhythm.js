import React from 'react';
import Occurrence from './occurrence';
import { numeratorTerm } from '../../utils/numerator-term';
import { denominatorTerm } from '../../utils/denominator-term';
import {
  subDays,
  startOfDay,
  endOfDay,
  isWithinInterval,
  differenceInDays,
} from 'date-fns';

function wasDateHit(hits, dateToCheck) {
  return Boolean(
    hits.find((hit) => {
      return isWithinInterval(hit, {
        start: startOfDay(dateToCheck),
        end: endOfDay(dateToCheck),
      });
    })
  );
}

export function calculateCooldown(hitGoalInDays, daysSinceLastHit) {
  const cooldown = (hitGoalInDays - daysSinceLastHit) / hitGoalInDays;
  return cooldown >= 0 ? cooldown : 0;
}

function Rhythm({ rhythm, onTodaysOccurrenceToggle }) {
  const [frequencyNumerator, frequencyDenominator] = rhythm.frequency;
  const [actionFirstLetter, ...actionRest] = rhythm.action.split('');
  const action = [actionFirstLetter.toUpperCase(), ...actionRest].join('');

  const hitToday = wasDateHit(rhythm.hits, new Date());
  const toggleHit = () => onTodaysOccurrenceToggle(!hitToday);

  let lastHitDate = null;
  const numberOfDays = 13;
  const occurrences = new Array(numberOfDays)
    .fill()
    .map((_, i) => {
      return numberOfDays - i;
    })
    .map((daysAgo) => {
      const date = subDays(new Date(), daysAgo);
      lastHitDate = wasDateHit(rhythm.hits, date) ? date : lastHitDate;

      let cooldown = 0;
      if (lastHitDate) {
        const daysSinceLastHit = differenceInDays(date, lastHitDate);
        cooldown = calculateCooldown(frequencyDenominator, daysSinceLastHit);
      }

      return (
        <li key={daysAgo} className="flex mr-auto">
          <Occurrence
            open={false}
            onClick={toggleHit}
            date={date}
            cooldown={cooldown}
          />
        </li>
      );
    });

  return (
    <div>
      <div className="w-10/12">
        <div className="text-4xl md:text-5xl font-bold text-gray-800">
          {action}
        </div>
        <div className="text-2xl md:text-4xl text-gray-800 md:mt-2">
          {numeratorTerm(frequencyNumerator)} every{' '}
          {denominatorTerm(frequencyDenominator)}
        </div>
        <div className="text-2xl font-normal text-gray-600 md:mt-2">
          because {rhythm.reason}
        </div>
      </div>
      <ul className="flex mt-3 md:mt-5 md:mr-4 mr-2">{occurrences}</ul>
      <div className="absolute z-20 right-2 -mt-4 md:right-3 md:-mt-6">
        <Occurrence
          cooldown={hitToday ? 1 : 0}
          open={true}
          onClick={toggleHit}
          date={new Date()}
        />
      </div>
    </div>
  );
}

export default Rhythm;
