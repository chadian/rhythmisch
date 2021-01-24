import buttonStyles from '../../styles/buttons.module.css';
import Occurrence from './occurrence';
import { numeratorTerm } from '../../utils/numerator-term';
import { denominatorTerm } from '../../utils/denominator-term';
import { subDays, startOfDay, endOfDay, isWithinInterval } from "date-fns";

function wasDateHit(hits, dateToCheck) {
  return Boolean(
    hits.find((hit) => {
      return isWithinInterval(hit, {
        start: startOfDay(dateToCheck),
        end: endOfDay(dateToCheck),
      });
    })
  );
}

function Rhythm({ rhythm, onEdit, onTodaysOccurrenceToggle }) {
  const [frequencyNumerator, frequencyDenominator] = rhythm.frequency;

  const hitToday = wasDateHit(rhythm.hits, new Date());
  const toggleHit = () => onTodaysOccurrenceToggle(!hitToday);

  const numberOfDays = 13;
  const occurrences = new Array(numberOfDays)
    .fill()
    .map((_, i) => {
      const daysAgo = i + 1;
      const date = subDays(new Date(), daysAgo);
      const hitOnDateToCheck = wasDateHit(rhythm.hits, date);

      const isLast = daysAgo === 0;
      const className = isLast ? "relative" : "";

      return (
        <li key={daysAgo} className={className}>
          <Occurrence
            hit={hitOnDateToCheck}
            open={false}
            onClick={toggleHit}
            date={date}
          />
        </li>
      );
    })
    .reverse();

  return (
    <div className="box-border pr-3 max-w-2xl mr-3">
      <button
        className={buttonStyles["button-tiny"]}
        onClick={() => onEdit(rhythm)}
      >
        Edit
      </button>
      <div className="box-border">
        <div className="text-5xl font-bold text-gray-800">{rhythm.action}</div>
        <div className="text-4xl text-gray-800 mt-1">
          {numeratorTerm(frequencyNumerator)} every{" "}
          {denominatorTerm(frequencyDenominator)}
        </div>
        <div className="text-4xl font-normal text-gray-600 mt-1">
          because {rhythm.reason}
        </div>
      </div>
      <ul className="flex mt-4 place-content-between">{occurrences}</ul>
      <div className="absolute -right-9 -mt-8">
        <Occurrence
          hit={hitToday}
          open={true}
          onClick={toggleHit}
          date={new Date()}
        />
      </div>
    </div>
  );
}

export default Rhythm;