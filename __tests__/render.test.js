import React from 'react';
import { render } from '@testing-library/react';
import RhythmischApp from '../pages/app';
import { RhythmsProvider } from '../hooks/rhythms';
import { ThemeProvider } from '../hooks/theme';
import { setLocalStorageRhythms } from '../hooks/rhythms/local-storage';
import '@testing-library/jest-dom/extend-expect';

let rendered;

function setup() {
  rendered = render(
    <ThemeProvider>
      <RhythmsProvider>
        <RhythmischApp />
      </RhythmsProvider>
    </ThemeProvider>
  );
}

describe('render', () => {
  beforeEach(() => {
    setup();
  });

  it('renders an Add button', () => {
    const addButton = rendered.getByRole('button', { name: 'Add' });
    expect(addButton).toBeInTheDocument();
  });

  it('renders the default Rhythm', () => {
    const action = rendered.getByText('Use Rhythmisch on this device');
    expect(action).toBeInTheDocument();

    const frequency = rendered.getByText('once every day');
    expect(frequency).toBeInTheDocument();

    const reason = rendered.getByText('because I want to get into the rhythm');
    expect(reason).toBeInTheDocument();

    const historicalOccurrences =
      rendered.getAllByLabelText(/Missed target on /);
    expect(historicalOccurrences).toHaveLength(13);

    const todaysOccurrence = rendered.getByLabelText(/Mark as /);
    expect(todaysOccurrence).toBeInTheDocument();

    // the default rhythm is not stored in local storage
    expect(JSON.parse(window.localStorage.getItem('app.rhythms'))).toBeNull();
  });

  describe('with an empty list of rhythms', () => {
    beforeEach(() => {
      setLocalStorageRhythms([]);
      setup();
    });

    it('renders an empty rhythm list message', () => {
      const emptyRhythmsText = rendered.getByText(
        'All out of rhythms, enjoy some fresh air 💜'
      );
      expect(emptyRhythmsText).toBeInTheDocument();
    });
  });
});
