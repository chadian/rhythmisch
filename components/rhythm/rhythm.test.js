import { getByRole, render } from "@testing-library/react";
import { parseISO, subHours } from "date-fns";
import Rhythm from "./rhythm";
import MockDate from "mockdate";
import userEvent from "@testing-library/user-event";

let mockNow;
let rhythmModel;
let toggleTodaysOccurrence;

beforeEach(() => {
  mockNow = parseISO("2021-01-24T16:20:00");
  MockDate.set(mockNow);
  rhythmModel = {
    action: "I want to run",
    frequency: [2, 3],
    reason: "I want to train for a marathon",
    hits: [],
  };
});

afterEach(() => {
  MockDate.reset();
});

it("renders", () => {
  rhythmModel.hits.push(
    parseISO("2021-01-22T16:20:00"),
    parseISO("2021-01-20T16:20:00"),
    parseISO("2021-01-12T16:20:00"),

    // outside the range of being shown
    parseISO("2021-01-09T16:20:00"),
    parseISO("2021-01-05T16:20:00")
  );

  const rendered = render(<Rhythm rhythm={rhythmModel} />);

  const actionText = rendered.getByText("I want to run");
  const frequencyText = rendered.getByText("twice every three days");
  const reasonText = rendered.getByText(
    "because I want to train for a marathon"
  );
  const hitTargets = rendered.getAllByLabelText(/Hit target on /);
  const missedTargets = rendered.getAllByLabelText(/Missed target on /);

  expect(actionText).toBeTruthy();
  expect(frequencyText).toBeTruthy();
  expect(reasonText).toBeTruthy();

  const hitTargetLabels = hitTargets.map((target) =>
    target.getAttribute("aria-label")
  );
  expect(hitTargetLabels).toHaveLength(3);
  expect(hitTargetLabels).toContain("Hit target on January 22nd, 2021");
  expect(hitTargetLabels).toContain("Hit target on January 20th, 2021");
  expect(hitTargetLabels).toContain("Hit target on January 12th, 2021");

  const missedTargetLabels = missedTargets.map((target) =>
    target.getAttribute("aria-label")
  );
  expect(missedTargetLabels).toHaveLength(10);
  expect(missedTargetLabels).toContain("Missed target on January 23rd, 2021");
  expect(missedTargetLabels).toContain("Missed target on January 21st, 2021");
  expect(missedTargetLabels).toContain("Missed target on January 19th, 2021");
});

it('works with the onEdit handler', () => {
  const onEditHandler = jest.fn();
  const rendered = render(
    <Rhythm rhythm={rhythmModel} onEdit={onEditHandler} />
  );
  userEvent.click(rendered.getByRole('button', { name: /Edit/ }));
  expect(onEditHandler).toHaveBeenCalledWith(rhythmModel);
});

describe("todays occurrence", () => {
  it("receives toggled todays occurrence", () => {
    const toggleTodaysOccurrence = jest.fn();

    const rendered = render(
      <Rhythm
        rhythm={rhythmModel}
        onTodaysOccurrenceToggle={toggleTodaysOccurrence}
      />
    );

    const todaysOccurrenceButton = rendered.getByRole("button", {
      name: /Mark as/,
    });

    userEvent.click(todaysOccurrenceButton);
    expect(toggleTodaysOccurrence).toHaveBeenCalledWith(true);
  });

  it("renders today as missed when the rhythm occurrences do not contain an entry for today", () => {
    rhythmModel.hits = [];

    const rendered = render(
      <Rhythm
        rhythm={rhythmModel}
      />
    );

    expect(
      rendered.getByRole('button', { name: "Mark as hit on January 24th, 2021" })
    );
  });

  it("renders today as hit when the rhythm occurrences contain an entry for today", () => {
    const hitFromTwoHoursAgo = subHours(mockNow, 2);
    rhythmModel.hits = [hitFromTwoHoursAgo];

    const rendered = render(
      <Rhythm
        rhythm={rhythmModel}
      />
    );

    expect(
      rendered.getByRole('button', { name: "Mark as missed on January 24th, 2021" })
    );
  });
});
