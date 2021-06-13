import React from 'react';
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RhythmEdit from "./rhythm-edit";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "../../hooks/theme";

let actionInput;
let numeratorSelect;
let denominatorSelect;
let reasonInput;
let submitButton;
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

  render(
    <ThemeProvider>
      <RhythmEdit rhythm={rhythm} onSubmit={onSubmitCallback} />
    </ThemeProvider>
  );

  actionInput = screen.getByDisplayValue("I want to run");
  numeratorSelect = screen.getByLabelText("Rhythm action count");
  denominatorSelect = screen.getByLabelText("Rhythm action count time span");
  reasonInput = screen.getByDisplayValue("I want to train for a marathon");

  submitButton = rhythm.id
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

  userEvent.click(submitButton);

  expect(onSubmitCallback).toHaveBeenCalledTimes(1);
  expect(onSubmitCallback).toHaveBeenCalledWith({
    id: 'some-rhythm-id',
    action: "I want to swim",
    frequency: [4, 5],
    reason: "I want to do a triathlon",
  });
});

test("it evens out equal numerator and denominator values to once every day", () => {
  userEvent.selectOptions(numeratorSelect, "four times");
  expect(numeratorSelect).toHaveValue("4");

  userEvent.selectOptions(denominatorSelect, "five days");
  expect(denominatorSelect).toHaveValue("5");

  // push to times to match days
  userEvent.selectOptions(numeratorSelect, "five times");

  // resets to once every day
  expect(numeratorSelect).toHaveValue("1");
  expect(denominatorSelect).toHaveValue("1");
});

describe("submit button label", () => {
  it('shows a button with a label of "Create" when the rhythm model ** does not ** have an id', () => {
    setup({ rhythm: { id: undefined }});
    expect(submitButton).toHaveTextContent('Create');
    expect(submitButton).toBeInTheDocument();
  });

  it('shows a button with a label of "Update" when the rhythm model ** does ** have an id', () => {
    setup({ rhythm: { id: "has-a-rhythm-id" } });
    expect(submitButton).toHaveTextContent("Update");
    expect(submitButton).toBeInTheDocument();
  });
});

describe('validation', () => {
  const ariaDescribedByAttrLabel = "aria-describedby";
  const ariaInvalidLabel = "aria-invalid";

  test('it does not call onSubmit callback when an error exists', () => {
    userEvent.clear(actionInput);
    expect(actionInput).toHaveValue('');
    expect(actionInput).not.toHaveAttribute(ariaInvalidLabel);
    userEvent.click(submitButton);
    expect(onSubmitCallback).not.toHaveBeenCalledWith();
  });

  test('it shows an error for an empty rhythm action', () => {
    userEvent.clear(actionInput);
    expect(actionInput).toHaveValue('');
    expect(actionInput).not.toHaveAttribute(ariaDescribedByAttrLabel);

    expect(actionInput).not.toHaveAttribute(ariaInvalidLabel);
    expect(actionInput).not.toHaveAttribute(ariaDescribedByAttrLabel);
    userEvent.click(submitButton);

    expect(actionInput).toHaveAttribute(ariaInvalidLabel, 'true');
    expect(actionInput).toHaveAttribute(ariaDescribedByAttrLabel);
    const errorElementId = actionInput.getAttribute(ariaDescribedByAttrLabel);
    const errorElement = screen.getByText('This is a required field');
    expect(errorElement).toHaveAttribute('id', errorElementId);
  });

  test("it shows an error for an empty rhythm reason", () => {
    userEvent.clear(reasonInput);
    expect(reasonInput).toHaveValue("");
    expect(reasonInput).not.toHaveAttribute(ariaInvalidLabel);
    expect(reasonInput).not.toHaveAttribute(ariaDescribedByAttrLabel);
    userEvent.click(submitButton);

    expect(reasonInput).toHaveAttribute(ariaInvalidLabel, 'true');
    expect(reasonInput).toHaveAttribute(ariaDescribedByAttrLabel);
    const errorElementId = reasonInput.getAttribute(ariaDescribedByAttrLabel);
    const errorElement = screen.getByText("This is a required field");
    expect(errorElement).toHaveAttribute("id", errorElementId);
  });

  test('it shows an error when the frequency numerator is greater than the denominator', async () => {
    const ariaDescribedByAttrLabel = "aria-describedby";
    userEvent.selectOptions(numeratorSelect, "five times");
    userEvent.selectOptions(denominatorSelect, "three days");

    expect(numeratorSelect).not.toHaveAttribute(ariaInvalidLabel);
    expect(numeratorSelect).not.toHaveAttribute("aria-describedby");
    expect(denominatorSelect).not.toHaveAttribute(ariaInvalidLabel);
    expect(denominatorSelect).not.toHaveAttribute("aria-describedby");
    userEvent.click(submitButton);

    expect(numeratorSelect).toHaveAttribute(ariaInvalidLabel, 'true');
    expect(numeratorSelect).toHaveAttribute(ariaDescribedByAttrLabel);
    expect(denominatorSelect).toHaveAttribute(ariaInvalidLabel, 'true');
    expect(denominatorSelect).toHaveAttribute(ariaDescribedByAttrLabel);

    const numeratorDescribeById = numeratorSelect.getAttribute(ariaDescribedByAttrLabel);
    const denominatorDescribeById = denominatorSelect.getAttribute(
      ariaDescribedByAttrLabel
    );
    expect(numeratorDescribeById).toEqual(denominatorDescribeById);
    const errorElement = screen.getByText("Frequency is at most once per day");
    expect(errorElement).toHaveAttribute('id', numeratorDescribeById);
  });
});