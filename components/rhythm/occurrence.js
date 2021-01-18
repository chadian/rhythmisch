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
  const ariaLabel = hit
    ? `Hit target on ${formattedDate}`
    : `Missed target on ${formattedDate}`;

  if (open) {
    return <button onClick={onClick} className={classNames}></button>;
  } else {
    return <div role="img" aria-label={ariaLabel} className={classNames}></div>;
  }
}
