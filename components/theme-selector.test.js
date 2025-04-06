import React from 'react';
import ThemeSelector from './theme-selector';
import { ThemeProvider } from '../hooks/theme';
import { setLocalStorageTheme } from '../hooks/theme/local-storage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

function setup(themeData) {
  setLocalStorageTheme(themeData);
  render(
    <ThemeProvider>
      <ThemeSelector />
    </ThemeProvider>
  );
}

test('it renders', () => {
  setup({ theme: 'webog' });
  const themeButtons = screen.getAllByRole('radio');
  expect(themeButtons).toHaveLength(6);
  expect(screen.getByLabelText('webog')).toBeInTheDocument();
  expect(screen.getByLabelText('swiss')).toBeInTheDocument();
  expect(screen.getByLabelText('edmonton')).toBeInTheDocument();
  expect(screen.getByLabelText('portland')).toBeInTheDocument();
  expect(screen.getByLabelText('ubahn')).toBeInTheDocument();
  expect(screen.getByLabelText('heroku')).toBeInTheDocument();
});

test('it loads the default theme when a theme has not been saved', () => {
  setup(null);
  expect(screen.getByLabelText('webog')).toHaveAttribute(
    'aria-checked',
    'true'
  );
  expect(screen.getByLabelText('portland')).toHaveAttribute(
    'aria-checked',
    'false'
  );
});

test('it loads a saved theme', () => {
  setup({ theme: 'portland' });
  expect(screen.getByLabelText('webog')).toHaveAttribute(
    'aria-checked',
    'false'
  );
  expect(screen.getByLabelText('portland')).toHaveAttribute(
    'aria-checked',
    'true'
  );
});

test('it saves a selected theme', () => {
  setup({ theme: 'webog' });
  expect(screen.getByLabelText('webog')).toHaveAttribute(
    'aria-checked',
    'true'
  );

  expect(screen.getByLabelText('portland')).toHaveAttribute(
    'aria-checked',
    'false'
  );

  userEvent.click(screen.getByLabelText('portland'));

  expect(screen.getByLabelText('webog')).toHaveAttribute(
    'aria-checked',
    'false'
  );

  expect(screen.getByLabelText('portland')).toHaveAttribute(
    'aria-checked',
    'true'
  );
});
