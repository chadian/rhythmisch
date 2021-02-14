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

function Rhythm({ rhythm, onTodaysOccurrenceToggle }) {
  const [frequencyNumerator, frequencyDenominator] = rhythm.frequency;
  const [actionFirstLetter, ...actionRest] = rhythm.action.split('');
  const action = [actionFirstLetter.toUpperCase(), ...actionRest].join('')

  const hitToday = wasDateHit(rhythm.hits, new Date());
  const toggleHit = () => onTodaysOccurrenceToggle(!hitToday);

  const numberOfDays = 13;
  const occurrences = new Array(numberOfDays)
    .fill()
    .map((_, i) => {
      const daysAgo = i + 1;
      const date = subDays(new Date(), daysAgo);
      const hitOnDateToCheck = wasDateHit(rhythm.hits, date);

      return (
        <li key={daysAgo} className="mr-auto">
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
    <div>
      <div className="w-10/12">
        <div className="text-5xl font-bold text-gray-800">
          {action}
        </div>
        <div className="text-4xl text-gray-800 mt-2">
          {numeratorTerm(frequencyNumerator)} every{" "}
          {denominatorTerm(frequencyDenominator)}
        </div>
        <div className="text-4xl font-normal text-gray-600 mt-2">
          because {rhythm.reason}
        </div>
      </div>
      <ul className="flex mt-5">{occurrences}</ul>
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