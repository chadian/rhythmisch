import { useState } from 'react';
import styles from '../../styles/Rhythm.module.css';
import Occurrence from './occurrence';

function Rhythm({ action, frequency, reason }) {
  const [opportunityTaken, setOpportunity] = useState(false);
  const toggleOpportunityTaken = () => setOpportunity(!opportunityTaken);
  const opportunityStatus = opportunityTaken ? 'opportunity-taken' : 'opportunity';

  return (
    <div className={styles.rhythm}>
      <div className={styles.action}>
        {action}
      </div>
      <div className={styles.frequency}>
        {frequency}
      </div>
      <div className={styles.reason}>
        {reason}
      </div>
      <div className={styles.occurrences}>
        <Occurrence status="miss"/>
        <Occurrence status="miss"/>
        <Occurrence status="miss"/>
        <Occurrence status="miss"/>
        <Occurrence status="miss"/>
        <Occurrence status="miss"/>
        <Occurrence status="hit"/>
        <Occurrence status="hit"/>
        <Occurrence status="hit"/>
        <Occurrence status="miss"/>
        <Occurrence status="hit"/>
        <Occurrence status="miss"/>
        <Occurrence status="hit"/>
        <Occurrence onClick={toggleOpportunityTaken} status={opportunityStatus} />
      </div>
    </div>
  );
}

export default Rhythm;