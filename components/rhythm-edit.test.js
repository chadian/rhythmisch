import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RhythmEdit from './rhythm-edit';
import "@testing-library/jest-dom/extend-expect";

describe('with an existing rhythm object', () => {
  let rhythm;
  let actionInput;
  let numeratorSelect;
  let denominatorSelect;
  let reasonInput;
  let submit;
  let onSubmitCallback;

  beforeEach(() => {
    rhythm = {
      action: "I want to run",
      frequency: [2, 3],
      reason: "I want to train for a marathon",
    };

    onSubmitCallback = jest.fn();

    const rendered = render(
      <RhythmEdit rhythm={rhythm} onSubmit={onSubmitCallback}/>
    );

    actionInput = rendered.getByDisplayValue("I want to run");
    numeratorSelect = rendered.getByLabelText("Rhythm action count");
    denominatorSelect = rendered.getByLabelText(
      "Rhythm action count time span"
    );
    reasonInput = rendered.getByDisplayValue("I want to train for a marathon");
    submit = rendered.getByRole("button", { name: "Update" });
  });

  test("it renders the rhythm's editable properties", () => {
    expect(actionInput).toBeTruthy();
    expect(reasonInput).toBeTruthy();
    expect(numeratorSelect).toBeTruthy();
    expect(denominatorSelect).toBeTruthy();
  });

  test('it can submit changes', async () => {
    userEvent.clear(actionInput);
    userEvent.type(actionInput, "I want to swim");

    userEvent.selectOptions(numeratorSelect, "four times");
    userEvent.selectOptions(denominatorSelect, "five days");

    userEvent.clear(reasonInput);
    userEvent.type(reasonInput, "I want to do a triathlon");

    userEvent.click(submit);

    expect(onSubmitCallback).toHaveBeenCalledTimes(1);
    expect(onSubmitCallback).toHaveBeenCalledWith({
      action: "I want to swim",
      frequency: [4, 5],
      reason: 'I want to do a triathlon'
    });
  });
});

