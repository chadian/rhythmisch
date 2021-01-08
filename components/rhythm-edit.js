import { useState } from "react";
import styles from "../styles/RhythmEdit.module.css";
import { denominatorTerm } from "../utils/denominator-term";
import { numeratorTerm } from '../utils/numerator-term';

const generateNumeratorSelect = (selected, onChange) => {
  const options = [1, 2, 3, 4, 5, 6, 7].map((number) => {
    return <option key={number} value={number}>{ numeratorTerm(number) }</option>;
  });

  return <select onChange={onChange} aria-label="Rhythm action count" value={selected}>{
    options
  }</select>;
};

const generateDenominatorSelect = (selected, onChange) => {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((number) => {
    return <option key={number} value={number}>{ denominatorTerm(number) }</option>;
  });

  return <select onChange={onChange} aria-label="Rhythm action count time span" value={selected}>
    { options }
  </select>;
};

export default function RhythmEdit({ rhythm, onClose, onSubmit }) {
  const [rhythmAction, setRhythmAction] = useState(rhythm.action);
  const [rhythmFrequency, setRhythmFrequency] = useState(rhythm.frequency);
  const [rhythmNumerator, rhythmDenominator] = rhythmFrequency;
  const [rhythmReason, setRhythmReason] = useState(rhythm.reason);

  const submitHandler = (e) => {
    e.preventDefault();

    onSubmit({
      action: rhythmAction,
      reason: rhythmReason,
      frequency: rhythmFrequency,
    });
  };

  return (
    <form className={styles["rhythm-edit"]} onSubmit={submitHandler}>
      <button type="button" onClick={() => onClose()} className={styles.close}>
        Close
      </button>
      <div className={styles.action}>
        <span className={styles["i-want-to"]}>I want to</span>
        <input
          aria-label="Rhythm action description"
          placeholder="do something small"
          value={rhythmAction}
          onChange={(event) => setRhythmAction(event.target.value)}
        />
      </div>
      <div className={styles.frequency}>
        {generateNumeratorSelect(rhythmNumerator, (e) =>
          setRhythmFrequency([Number(e.target.value), rhythmDenominator])
        )}
        <span className={styles.every}>every</span>
        {generateDenominatorSelect(rhythmDenominator, (e) =>
          setRhythmFrequency([rhythmNumerator, Number(e.target.value)])
        )}
      </div>
      <div className="styles.reason">
        <div className={styles.action}>
          <span className={styles.because}>because</span>
          <input
            aria-label="Rhythm action description"
            placeholder="every bit counts"
            value={rhythmReason}
            onChange={(event) => setRhythmReason(event.target.value)}
          />
        </div>
      </div>
      <button type="submit">Update Rhythm</button>
    </form>
  );
}