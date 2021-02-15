import RhythmischApp from "../pages/index";
import { RhythmsProvider } from "../hooks/rhythms";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

beforeEach(() => {
  render(
    <RhythmsProvider>
      <RhythmischApp />
    </RhythmsProvider>
  );
});

it("can add a new rhythm", () => {
  const addButton = screen.getByRole('button', { name: 'Add' });
  userEvent.click(addButton);
  const modal = screen.getByRole('dialog');
  expect(modal).toBeInTheDocument();

  const action = screen.getByLabelText('Rhythm action description');
  const numeratorFrequency = screen.getByLabelText('Rhythm action count');
  const denomenatorFrequency = screen.getByLabelText('Rhythm action count time span');
  const reason = screen.getByLabelText('Rhythm reason description');
  const submit = screen.getByRole('button', { name: 'Create' });

  userEvent.type(action, 'read every day');
  userEvent.selectOptions(numeratorFrequency, 'thrice');
  userEvent.selectOptions(denomenatorFrequency, 'week');
  userEvent.type(reason, 'there is much I would like to learn');
  userEvent.click(submit);

  expect(modal).not.toBeInTheDocument();

  expect(screen.getByText('Read every day')).toBeInTheDocument();
  expect(screen.getByText('thrice every week')).toBeInTheDocument();
  expect(screen.getByText('because there is much I would like to learn')).toBeInTheDocument();
});
