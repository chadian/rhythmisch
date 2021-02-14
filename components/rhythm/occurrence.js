import { format } from 'date-fns';

export default function Occurrence({ hit, onClick, open, date }) {
  const classNames = ["w-6", "h-6", "rounded-full", "inline-block"];
  const formattedDate = format(date, "MMMM do, yyyy");

  if (open) {
    const ariaLabel = hit ? `Mark as missed on ${formattedDate}` : `Mark as hit on ${formattedDate}`;
    classNames.push("bg-white");

    if (!hit) {
      classNames.push("filter-blur-occurrence-miss");
    }

    return (
      <button
        role="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className={classNames.join(' ')}
      ></button>
    );
  } else {
    classNames.push(hit ? "bg-red-600" : "bg-gray-100");

    const ariaLabel = hit
      ? `Hit target on ${formattedDate}`
      : `Missed target on ${formattedDate}`;

    return (
      <div role="img" aria-label={ariaLabel} className={classNames.join(' ')}></div>
    );
  }
}
