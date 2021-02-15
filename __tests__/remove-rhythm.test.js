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

it("can delete an existing rhythm", () => {
  const action = screen.getByText("Use Rhythmisch");
  const frequency = screen.getByText("once every day");
  const reason = screen.getByText("because I want to get into the rhythm");

  expect(action).toBeInTheDocument();
  expect(frequency).toBeInTheDocument();
  expect(reason).toBeInTheDocument();

  const deleteButton = screen.getByRole('button', { name: 'Remove' });
  userEvent.click(deleteButton);

  expect(action).not.toBeInTheDocument();
  expect(frequency).not.toBeInTheDocument();
  expect(reason).not.toBeInTheDocument();
});
