import React from 'react';
import RhythmischApp from "../pages/app";
import { RhythmsProvider } from "../hooks/rhythms";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "../hooks/theme";
import { setLocalStorageRhythms } from "../hooks/rhythms/local-storage";

const getLocalStorageRhythms = () => {
  const localStorageRhythms = JSON.parse(
    window.localStorage.getItem("app.rhythms")
  );
  return localStorageRhythms;
};

let rhythm;

beforeEach(() => {
  rhythm = {
    id: "local-storage-rhythm",
    action: "pass this test",
    reason: "tests should pass",
    frequency: [1, 1],
    hits: [],
  };

  setLocalStorageRhythms([rhythm]);

  render(
    <ThemeProvider>
      <RhythmsProvider>
        <RhythmischApp />
      </RhythmsProvider>
    </ThemeProvider>
  );
});

it("can edit an existing rhythm", () => {
  let localStorageRhythms = getLocalStorageRhythms();
  expect(localStorageRhythms).toHaveLength(1);
  const localStorageRhythm = localStorageRhythms[0];
  expect(localStorageRhythm.id).toBe(rhythm.id);
  expect(localStorageRhythm.action).toBe(rhythm.action);
  expect(localStorageRhythm.reason).toBe(rhythm.reason);
  expect(localStorageRhythm.frequency).toMatchObject(rhythm.frequency);
  expect(localStorageRhythm.hits).toMatchObject(rhythm.hits);

  const editButton = screen.getByRole('button', { name: 'Edit' });
  userEvent.click(editButton);

  const modal = screen.getByRole("dialog");
  expect(modal).toBeInTheDocument();

  const action = screen.getByLabelText("Rhythm action description");
  const numeratorFrequency = screen.getByLabelText("Rhythm action count");
  const denomenatorFrequency = screen.getByLabelText(
    "Rhythm action count time span"
  );
  const reason = screen.getByLabelText("Rhythm reason description");
  const submit = screen.getByRole("button", { name: "Update" });

  userEvent.clear(action);
  userEvent.type(action, "read every day");
  userEvent.selectOptions(numeratorFrequency, "thrice");
  userEvent.selectOptions(denomenatorFrequency, "week");
  userEvent.clear(reason);
  userEvent.type(reason, "there is much I would like to learn");
  userEvent.click(submit);

  expect(modal).not.toBeInTheDocument();

  expect(screen.getByText("Read every day")).toBeInTheDocument();
  expect(screen.getByText("thrice every week")).toBeInTheDocument();
  expect(
    screen.getByText("because there is much I would like to learn")
  ).toBeInTheDocument();

  localStorageRhythms = getLocalStorageRhythms();
  expect(localStorageRhythms).toHaveLength(1);
  const updatedLocalStorageRhythm = localStorageRhythms[0];
  expect(updatedLocalStorageRhythm.id).toBe(rhythm.id);
  expect(updatedLocalStorageRhythm.action).toBe('read every day');
  expect(updatedLocalStorageRhythm.reason).toBe(
    "there is much I would like to learn"
  );
  expect(updatedLocalStorageRhythm.frequency).toMatchObject([3, 7]);
  expect(updatedLocalStorageRhythm.hits).toMatchObject([]);
});
