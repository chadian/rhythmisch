import { useState } from "react";
import Button from "../components/button";
import { denominatorTerm } from "../utils/denominator-term";
import { numeratorTerm } from "../utils/numerator-term";

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
    <form
      className="text-2xl"
      onSubmit={submitHandler}
    >
      <Button
        onClick={() => onClose()}
        attrs={{ className: "absolute top-8 right-8" }}
      >
        Close
      </Button>
      <div className="flex flex-col space-y-10">
        <div className="flex items-baseline">
          <span className="mr-4">I want to</span>
          <input
            className={inputClassNames}
            aria-label="Rhythm action description"
            placeholder="get into a rhythm"
            value={rhythmAction}
            onChange={(event) => setRhythmAction(event.target.value)}
            autoFocus
          />
        </div>
        <div className="flex items-baseline">
          {numeratorSelect}
          <span className="mx-4">every</span>
          {denominatorSelect}
        </div>
        <div className="flex items-baseline">
          <span className="mr-4">because</span>
          <input
            className={`w-96 ${inputClassNames}`}
            aria-label="Rhythm reason description"
            placeholder="it will bring positive change"
            value={rhythmReason}
            onChange={(event) => setRhythmReason(event.target.value)}
          />
        </div>
        <Button attrs={{ type: "submit", className: "" }}>
          {rhythm.id ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
