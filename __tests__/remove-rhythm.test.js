import React from 'react';
import RhythmischApp from '../pages/app';
import { RhythmsProvider } from '../hooks/rhythms';
import { ThemeProvider } from '../hooks/theme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { setLocalStorageRhythms } from '../hooks/rhythms/local-storage';

const getLocalStorageRhythms = () => {
  const localStorageRhythms = JSON.parse(
    window.localStorage.getItem('app.rhythms')
  );
  return localStorageRhythms;
};

beforeEach(() => {
  setLocalStorageRhythms([
    {
      id: 'local-storage-rhythm',
      action: 'pass this test',
      reason: 'tests should pass',
      frequency: [1, 1],
      hits: [],
    },
  ]);

  render(
    <ThemeProvider>
      <RhythmsProvider>
        <RhythmischApp />
      </RhythmsProvider>
    </ThemeProvider>
  );
});

it('can delete an existing rhythm', async () => {
  expect(getLocalStorageRhythms()).toHaveLength(1);

  const action = screen.getByText('Pass this test');
  const frequency = screen.getByText('once every day');
  const reason = screen.getByText('because tests should pass');

  expect(action).toBeInTheDocument();
  expect(frequency).toBeInTheDocument();
  expect(reason).toBeInTheDocument();

  const deleteButton = screen.getByRole('button', { name: 'Remove' });
  await userEvent.click(deleteButton);

  expect(action).not.toBeInTheDocument();
  expect(frequency).not.toBeInTheDocument();
  expect(reason).not.toBeInTheDocument();

  expect(getLocalStorageRhythms()).toHaveLength(0);
});
