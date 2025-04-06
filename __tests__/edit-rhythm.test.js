import React from 'react';
import RhythmischApp from '../pages/app';
import { RhythmsProvider } from '../hooks/rhythms';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../hooks/theme';
import { setLocalStorageRhythms } from '../hooks/rhythms/local-storage';

const getLocalStorageRhythms = () => {
  const localStorageRhythms = JSON.parse(
    window.localStorage.getItem('app.rhythms')
  );
  return localStorageRhythms;
};

let rhythm;

beforeEach(() => {
  rhythm = {
    id: 'local-storage-rhythm',
    action: 'pass this test',
    reason: 'tests should pass',
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

it('can edit an existing rhythm', async () => {
  let localStorageRhythms = getLocalStorageRhythms();
  expect(localStorageRhythms).toHaveLength(1);
  const localStorageRhythm = localStorageRhythms[0];
  expect(localStorageRhythm.id).toBe(rhythm.id);
  expect(localStorageRhythm.action).toBe(rhythm.action);
  expect(localStorageRhythm.reason).toBe(rhythm.reason);
  expect(localStorageRhythm.frequency).toMatchObject(rhythm.frequency);
  expect(localStorageRhythm.hits).toMatchObject(rhythm.hits);

  const editButton = screen.getByRole('button', { name: 'Edit' });
  await userEvent.click(editButton);

  const modal = screen.getByRole('dialog');
  expect(modal).toBeInTheDocument();

  const action = screen.getByLabelText('Rhythm action description');
  const numeratorFrequency = screen.getByLabelText('Rhythm action count');
  const denomenatorFrequency = screen.getByLabelText(
    'Rhythm action count time span'
  );
  const reason = screen.getByLabelText('Rhythm reason description');
  const submit = screen.getByRole('button', { name: 'Update' });

  await userEvent.clear(action);
  await userEvent.type(action, 'read every day');
  await userEvent.selectOptions(numeratorFrequency, 'thrice');
  await userEvent.selectOptions(denomenatorFrequency, 'week');
  await userEvent.clear(reason);
  await userEvent.type(reason, 'there is much I would like to learn');
  await userEvent.click(submit);

  expect(modal).not.toBeInTheDocument();

  expect(screen.getByText('Read every day')).toBeInTheDocument();
  expect(screen.getByText('thrice every week')).toBeInTheDocument();
  expect(
    screen.getByText('because there is much I would like to learn')
  ).toBeInTheDocument();

  localStorageRhythms = getLocalStorageRhythms();
  expect(localStorageRhythms).toHaveLength(1);
  const updatedLocalStorageRhythm = localStorageRhythms[0];
  expect(updatedLocalStorageRhythm.id).toBe(rhythm.id);
  expect(updatedLocalStorageRhythm.action).toBe('read every day');
  expect(updatedLocalStorageRhythm.reason).toBe(
    'there is much I would like to learn'
  );
  expect(updatedLocalStorageRhythm.frequency).toMatchObject([3, 7]);
  expect(updatedLocalStorageRhythm.hits).toMatchObject([]);
});
