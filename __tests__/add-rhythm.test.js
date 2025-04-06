import React from 'react';
import RhythmischApp from '../pages/app';
import { RhythmsProvider } from '../hooks/rhythms';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../hooks/theme';
import { setLocalStorageRhythms } from '../hooks/rhythms/local-storage';

beforeEach(() => {
  setLocalStorageRhythms([]);

  render(
    <ThemeProvider>
      <RhythmsProvider>
        <RhythmischApp />
      </RhythmsProvider>
    </ThemeProvider>
  );
});

it('can add a new rhythm', async () => {
  const addButton = screen.getByRole('button', { name: 'Add' });
  await userEvent.click(addButton);
  const modal = screen.getByRole('dialog');
  expect(modal).toBeInTheDocument();

  const action = screen.getByLabelText('Rhythm action description');
  const numeratorFrequency = screen.getByLabelText('Rhythm action count');
  const denomenatorFrequency = screen.getByLabelText(
    'Rhythm action count time span'
  );
  const reason = screen.getByLabelText('Rhythm reason description');
  const submit = screen.getByRole('button', { name: 'Create' });

  await userEvent.type(action, 'read every day');
  await userEvent.selectOptions(numeratorFrequency, 'thrice');
  await userEvent.selectOptions(denomenatorFrequency, 'week');
  await userEvent.type(reason, 'there is much I would like to learn');
  await userEvent.click(submit);

  expect(modal).not.toBeInTheDocument();

  expect(screen.getByText('Read every day')).toBeInTheDocument();
  expect(screen.getByText('thrice every week')).toBeInTheDocument();
  expect(
    screen.getByText('because there is much I would like to learn')
  ).toBeInTheDocument();

  const localStorageRhythms = JSON.parse(
    window.localStorage.getItem('app.rhythms')
  );
  expect(localStorageRhythms).toHaveLength(1);
  const addedRhythm = localStorageRhythms[0];
  expect(addedRhythm.id).toBeTruthy();
  expect(addedRhythm.action).toBe('read every day');
  expect(addedRhythm.reason).toBe('there is much I would like to learn');
  expect(addedRhythm.frequency).toMatchObject([3, 7]);
  expect(addedRhythm.hits).toMatchObject([]);
});
