import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RhythmEdit from "./rhythm-edit";
import "@testing-library/jest-dom/extend-expect";

let actionInput;
let numeratorSelect;
let denominatorSelect;
let reasonInput;
let submit;
let onSubmitCallback;

function setup({rhythm} = {}) {
  cleanup();

  rhythm = {
    id: "some-rhythm-id",
    action: "I want to run",
    frequency: [2, 3],
    reason: "I want to train for a marathon",
    ...rhythm
  };

  onSubmitCallback = jest.fn();

  render(<RhythmEdit rhythm={rhythm} onSubmit={onSubmitCallback} />);

  actionInput = screen.getByDisplayValue("I want to run");
  numeratorSelect = screen.getByLabelText("Rhythm action count");
  denominatorSelect = screen.getByLabelText("Rhythm action count time span");
  reasonInput = screen.getByDisplayValue("I want to train for a marathon");

  submit = rhythm.id
    ? screen.getByRole("button", { name: "Update" })
    : screen.getByRole("button", { name: "Create" });
}

beforeEach(() => {
  setup();
});

test("it renders the rhythm's editable properties", () => {
  expect(actionInput).toBeTruthy();
  expect(reasonInput).toBeTruthy();
  expect(numeratorSelect).toBeTruthy();
  expect(denominatorSelect).toBeTruthy();
});

test("it can submit changes", async () => {
  userEvent.clear(actionInput);
  userEvent.type(actionInput, "I want to swim");

  userEvent.selectOptions(numeratorSelect, "four times");
  userEvent.selectOptions(denominatorSelect, "five days");

  userEvent.clear(reasonInput);
  userEvent.type(reasonInput, "I want to do a triathlon");

  userEvent.click(submit);

  expect(onSubmitCallback).toHaveBeenCalledTimes(1);
  expect(onSubmitCallback).toHaveBeenCalledWith({
    id: 'some-rhythm-id',
    action: "I want to swim",
    frequency: [4, 5],
    reason: "I want to do a triathlon",
  });
});

describe("submit button label", () => {
  it('shows a button with a label of "Create" when the rhythm model ** does not ** have an id', () => {
    setup({ rhythm: { id: undefined }});
    expect(submit).toHaveTextContent('Create');
    expect(submit).toBeInTheDocument();
  });

  it('shows a button with a label of "Update" when the rhythm model ** does ** have an id', () => {
    setup({ rhythm: { id: "has-a-rhythm-id" } });
    expect(submit).toHaveTextContent("Update");
    expect(submit).toBeInTheDocument();
  });
});
