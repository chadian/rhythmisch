import { useState } from 'react';
import styles from '../../styles/Rhythm.module.css';
import Occurrence from './occurrence';
import { numeratorTerm } from '../../utils/numerator-term';
import { denominatorTerm } from '../../utils/denominator-term';

function Rhythm({ rhythm, onEdit }) {
  const [opportunityTaken, setOpportunity] = useState(false);
  const toggleOpportunityTaken = () => setOpportunity(!opportunityTaken);
  const opportunityStatus = opportunityTaken ? 'opportunity-taken' : 'opportunity';
  const [frequencyNumerator, frequencyDenominator] = rhythm.frequency;

  return (
    <div className={styles.rhythm}>
      <button onClick={() => onEdit(rhythm)}>Edit</button>
      <div className={styles.action}>{rhythm.action}</div>
      <div className={styles.frequency}>{numeratorTerm(frequencyNumerator)} every {denominatorTerm(frequencyDenominator)}</div>
      <div className={styles.reason}>because {rhythm.reason}</div>
      <div className={styles.occurrences}>
        <Occurrence status="miss" />
        <Occurrence status="miss" />
        <Occurrence status="miss" />
        <Occurrence status="miss" />
        <Occurrence status="miss" />
        <Occurrence status="miss" />
        <Occurrence status="hit" />
        <Occurrence status="hit" />
        <Occurrence status="hit" />
        <Occurrence status="miss" />
        <Occurrence status="hit" />
        <Occurrence status="miss" />
        <Occurrence status="hit" />
        <Occurrence
          onClick={toggleOpportunityTaken}
          status={opportunityStatus}
        />
      </div>
    </div>
  );
}

export default Rhythm;