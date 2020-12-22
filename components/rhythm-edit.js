import styles from "../styles/RhythmEdit.module.css";

export default function RhythmEdit() {
  return (
    <div className={styles["rhythm-edit"]}>
      <div className={styles.action}>
        <span className={styles['i-want-to']}>I want to</span>
        <input aria-label="Rhythm action description" placeholder="do something small"/>
      </div>
      <div className={styles.frequency}>
        <select aria-label="Rhythm action count">
          <option>once</option>
          <option>twice</option>
          <option>thrice</option>
          <option>four times</option>
          <option>five times</option>
          <option>six times</option>
          <option>seven times</option>
        </select>
        <span class={styles.every}>every</span>
        <select aria-label="Rhythm action count time span">
          <option>day</option>
          <option>two days</option>
          <option>three days</option>
          <option>four days</option>
          <option>five days</option>
          <option>six days</option>
          <option>seven days</option>
        </select>
      </div>
      <div className="styles.reason">
        <div className={styles.action}>
          <span className={styles.because}>because</span>
          <input aria-label="Rhythm action description" placeholder="every bit counts"/>
        </div>
      </div>
      <button>Add Rhythm</button>
    </div>
  );
}