import { useState } from "react";
import Button from '../components/button';
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
      ...rhythm,
      action: rhythmAction,
      reason: rhythmReason,
      frequency: rhythmFrequency,
    });
  };

  const numeratorSelect = generateNumeratorSelect(rhythmNumerator, (e) =>
    setRhythmFrequency([Number(e.target.value), rhythmDenominator])
  );

  const denominatorSelect = generateDenominatorSelect(rhythmDenominator, (e) =>
    setRhythmFrequency([rhythmNumerator, Number(e.target.value)])
  );

  return (
    <form className={styles["rhythm-edit"]} onSubmit={submitHandler}>
      <Button onClick={() => onClose()} attrs={{ className: "absolute top-8 right-8" }}>
        Close
      </Button>
      <div className={styles.action}>
        <span className={styles["i-want-to"]}>I want to</span>
        <input
          aria-label="Rhythm action description"
          placeholder="get into a rhythm"
          value={rhythmAction}
          onChange={(event) => setRhythmAction(event.target.value)}
          autoFocus
        />
      </div>
      <div className={styles.frequency}>
        {numeratorSelect}
        <span className={styles.every}>every</span>
        {denominatorSelect}
      </div>
      <div className="styles.reason">
        <div className={styles.action}>
          <span className={styles.because}>because</span>
          <input
            aria-label="Rhythm reason description"
            placeholder="it will bring positive change"
            value={rhythmReason}
            onChange={(event) => setRhythmReason(event.target.value)}
          />
        </div>
      </div>
      <Button attrs={{type: "submit"}} >{rhythm.id ? 'Update' : 'Create'}</Button>
    </form>
  );
}