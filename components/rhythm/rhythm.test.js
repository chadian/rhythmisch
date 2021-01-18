import { render } from "@testing-library/react";
import { parseISO } from 'date-fns';
import Rhythm from "./rhythm";
import MockDate from "mockdate";

let rhythm;
let actionText;
let frequencyText;
let reasonText;
let hitTargets;
let missedTargets;

beforeEach(() => {
  const mockToday = parseISO('2021-01-24T16:20:00');
  MockDate.set(mockToday);

  rhythm = {
    action: "I want to run",
    frequency: [2, 3],
    reason: "I want to train for a marathon",
    hits: [
      parseISO("2021-01-22T16:20:00"),
      parseISO("2021-01-20T16:20:00"),
      parseISO("2021-01-12T16:20:00"),

      // outside the range of being shown
      parseISO("2021-01-09T16:20:00"),
      parseISO("2021-01-05T16:20:00"),
    ],
  };

  const rendered = render(<Rhythm rhythm={rhythm} />);
  actionText = rendered.getByText('I want to run');
  frequencyText = rendered.getByText('twice every three days');
  reasonText = rendered.getByText('because I want to train for a marathon');
  hitTargets = rendered.getAllByLabelText(/Hit target on /);
  missedTargets = rendered.getAllByLabelText(/Missed target on /);
});

afterEach(() => {
  MockDate.reset();
});

it('renders', () => {
  expect(actionText).toBeTruthy();
  expect(frequencyText).toBeTruthy();
  expect(reasonText).toBeTruthy();

  const hitTargetLabels = hitTargets.map(target => target.getAttribute('aria-label'));
  expect(hitTargetLabels).toHaveLength(3);
  expect(hitTargetLabels).toContain('Hit target on January 22nd, 2021');
  expect(hitTargetLabels).toContain('Hit target on January 20th, 2021');
  expect(hitTargetLabels).toContain('Hit target on January 12th, 2021');

  const missedTargetLabels = missedTargets.map((target) =>
    target.getAttribute("aria-label")
  );
  expect(missedTargetLabels).toHaveLength(10);
  expect(missedTargetLabels).toContain("Missed target on January 23rd, 2021");
  expect(missedTargetLabels).toContain("Missed target on January 21st, 2021");
  expect(missedTargetLabels).toContain("Missed target on January 19th, 2021");
});
