import { useState } from 'react';
import styles from '../../styles/Rhythm.module.css';
import Occurrence from './occurrence';

function Rhythm({ rhythm, onEdit }) {
  const [opportunityTaken, setOpportunity] = useState(false);
  const toggleOpportunityTaken = () => setOpportunity(!opportunityTaken);
  const opportunityStatus = opportunityTaken ? 'opportunity-taken' : 'opportunity';

  return (
    <div className={styles.rhythm}>
      <button onClick={() => onEdit(rhythm)}>Edit</button>
      <div className={styles.action}>{rhythm.action}</div>
      <div className={styles.frequency}>{rhythm.frequency}</div>
      <div className={styles.reason}>{rhythm.reason}</div>
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