import { useState } from "react";
import Button from "../button";
import { denominatorTerm } from "../../utils/denominator-term";
import { numeratorTerm } from "../../utils/numerator-term";
import { ValidationWrapper } from './validated-wrapper';

const sharedSelectAndInputClassNames = [
  "text-gray-800",
  "text-3xl",
  "font-bold",
  "border-2",
  "border-gray-300",
];

const inputClassNames = [
  ...sharedSelectAndInputClassNames,
  "py-2",
  "px-3",
  "w-96",
  "placeholder-gray-300",
].join(" ");

const selectClassNames = [...sharedSelectAndInputClassNames, "p-2", "w-48"].join(' ');

const generateNumeratorSelect = (selected, onChange) => {
  const options = [1, 2, 3, 4, 5, 6, 7].map((number) => {
    return (
      <option key={number} value={number}>
        {numeratorTerm(number)}
      </option>
    );
  });

  return (
    <select
      className={selectClassNames}
      onChange={onChange}
      aria-label="Rhythm action count"
      value={selected}
    >
      {options}
    </select>
  );
};

const generateDenominatorSelect = (selected, onChange) => {
  const options = [1, 2, 3, 4, 5, 6, 7].map((number) => {
    return (
      <option key={number} value={number}>
        {denominatorTerm(number)}
      </option>
    );
  });

  return (
    <select
      className={selectClassNames}
      onChange={onChange}
      aria-label="Rhythm action count time span"
      value={selected}
    >
      {options}
    </select>
  );
};

function validate(rhythm) {
  const [numerator, denominator] = rhythm.frequency;

  const result = {
    errors: {
      action: null,
      frequency: null,
      reason: null,
    },

    get isValid() {
      return (
        !this.errors.action &&
        !this.errors.frequency &&
        !this.errors.reason
      );
    }
  };

  const requiredError = 'This is a required field';

  if (typeof rhythm.action !== "string" || rhythm.action.length === 0) {
    result.errors.action = requiredError;
  }

  if (typeof rhythm.reason !== "string" || rhythm.reason.length === 0) {
    result.errors.reason = requiredError;
  }

  if (numerator > denominator) {
    result.errors.frequency = 'Frequency is at most once per day';
  }

  return result;
}

export default function RhythmEdit({ rhythm, onClose, onSubmit }) {
  const [rhythmAction, setRhythmAction] = useState(rhythm.action);
  const [rhythmFrequency, setRhythmFrequency] = useState(rhythm.frequency);
  const [rhythmNumerator, rhythmDenominator] = rhythmFrequency;
  const [rhythmReason, setRhythmReason] = useState(rhythm.reason);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const editedRhythm = {
    ...rhythm,
    action: rhythmAction,
    reason: rhythmReason,
    frequency: rhythmFrequency,
  };

  const validationResult = validate(editedRhythm);

  const submitHandler = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (validationResult.isValid) {
      onSubmit(editedRhythm);
    }
  };

  const numeratorSelect = generateNumeratorSelect(rhythmNumerator, (e) => {
    let numeratorValue = Number(e.target.value);
    let denominatorValue = rhythmDenominator;

    if (numeratorValue === denominatorValue) {
      numeratorValue = 1;
      denominatorValue = 1;
    }

    setRhythmFrequency([numeratorValue, denominatorValue]);
  });

  const denominatorSelect = generateDenominatorSelect(rhythmDenominator, (e) => {
    let numeratorValue = rhythmNumerator;
    let denominatorValue = Number(e.target.value);

    if (numeratorValue === denominatorValue) {
      numeratorValue = 1;
      denominatorValue = 1;
    }

    setRhythmFrequency([numeratorValue, denominatorValue]);
  });

  return (
    <form className="text-2xl" onSubmit={submitHandler}>
      <Button
        onClick={() => onClose()}
        attrs={{ className: "absolute top-8 right-8" }}
      >
        Close
      </Button>
      <div className="flex flex-col space-y-10">
        <div className="flex items-baseline">
          <span className="mr-4">I want to</span>
          <ValidationWrapper
            hasSubmitted={hasSubmitted}
            error={validationResult.errors.action}
          >
            <input
              className={inputClassNames}
              aria-label="Rhythm action description"
              aria-required="true"
              placeholder="get into a rhythm"
              value={rhythmAction}
              onChange={(event) => setRhythmAction(event.target.value)}
              autoFocus
            />
          </ValidationWrapper>
        </div>
        <div className="flex items-baseline">
          <ValidationWrapper
            hasSubmitted={hasSubmitted}
            error={validationResult.errors.frequency}
          >
            {numeratorSelect}
            <span className="mx-4">every</span>
            {denominatorSelect}
          </ValidationWrapper>
        </div>
        <div className="flex items-baseline">
          <span className="mr-4">because</span>
          <ValidationWrapper
            hasSubmitted={hasSubmitted}
            error={validationResult.errors.reason}
          >
            <input
              className={`w-96 ${inputClassNames}`}
              aria-label="Rhythm reason description"
              aria-required="true"
              placeholder="it will bring positive change"
              value={rhythmReason}
              onChange={(event) => setRhythmReason(event.target.value)}
            />
          </ValidationWrapper>
        </div>
        <Button attrs={{ type: "submit", className: "" }}>
          {rhythm.id ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
