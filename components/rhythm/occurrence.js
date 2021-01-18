import styles from "../../styles/Occurrence.module.css";
import { format } from 'date-fns';

export default function Occurrence({ hit, onClick, open, date }) {
  const classKeys = ["occurrence"];

  if (open) {
    classKeys.push(hit ? "open-hit" : "open-miss");
  } else {
    classKeys.push(hit ? "hit" : "miss");
  }

  const classNames = classKeys.map((key) => styles[key]).join(" ");

  const formattedDate = format(date, "MMMM do, yyyy");


  if (open) {
    const ariaLabel = hit ? `Mark as missed on ${formattedDate}` : `Mark as hit on ${formattedDate}`;

    return (
      <button
        role="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className={classNames}
      ></button>
    );
  } else {
    const ariaLabel = hit
      ? `Hit target on ${formattedDate}`
      : `Missed target on ${formattedDate}`;
    return <div role="img" aria-label={ariaLabel} className={classNames}></div>;
  }
}
