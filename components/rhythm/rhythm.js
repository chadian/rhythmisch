import { useState } from 'react';
import styles from '../../styles/Rhythm.module.css';
import Occurrence from './occurrence';
import { numeratorTerm } from '../../utils/numerator-term';
import { denominatorTerm } from '../../utils/denominator-term';
import { subDays, startOfDay, endOfDay, isWithinInterval } from "date-fns";

function Rhythm({ rhythm, onEdit, onTodaysHit }) {
  const [frequencyNumerator, frequencyDenominator] = rhythm.frequency;

  const hitToday = Boolean(rhythm.hits.find(hit => {
    return isWithinInterval(hit, {
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
    });
  }));

  const toggleHit = () => onTodaysHit(!hitToday);

  const occurrences = new Array(14).fill().map((_, daysAgo) => {
    const dateToCheck = subDays(new Date(), daysAgo);
    const hitOnDateToCheck = Boolean(rhythm.hits.find(hit => {
      return isWithinInterval(hit, { start: startOfDay(dateToCheck), end: endOfDay(dateToCheck) });
    }));
    return (
      <li key={daysAgo}>
        <Occurrence
          hit={hitOnDateToCheck}
          open={daysAgo === 0}
          onClick={toggleHit}
          date={dateToCheck}
        />
      </li>
    );
  }).reverse();

  return (
    <div className={styles.rhythm}>
      <button onClick={() => onEdit(rhythm)}>Edit</button>
      <div className={styles.action}>{rhythm.action}</div>
      <div className={styles.frequency}>
        {numeratorTerm(frequencyNumerator)} every{" "}
        {denominatorTerm(frequencyDenominator)}
      </div>
      <div className={styles.reason}>because {rhythm.reason}</div>
      <ul className={styles.occurrences}>
        {occurrences}
      </ul>
    </div>
  );
}

export default Rhythm;