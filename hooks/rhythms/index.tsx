import React, { createContext, useContext, useReducer } from 'react';
import { nanoid } from 'nanoid';
import { produce } from 'immer';
import { setLocalStorageRhythms } from './local-storage';
import { initializeRhythms } from './initialize';
import { startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { ReactChildrenProps, Rhythm, UnsavedRhythm } from '../../types';

type CREATE_ACTION = {
  type: 'CREATE';
  payload: { rhythm: UnsavedRhythm };
};

type UPDATE_ACTION = {
  type: 'UPDATE';
  payload: { id: string; partial: Partial<Rhythm> };
};

type DELETE_ACTION = {
  type: 'DELETE';
  payload: { id: string };
};

type HIT_TODAY_ACTION = {
  type: 'HIT_TODAY';
  payload: { id: string; hitToday: boolean };
};

type RhythmsReducerAction =
  | CREATE_ACTION
  | UPDATE_ACTION
  | DELETE_ACTION
  | HIT_TODAY_ACTION;
type RhythmsContextValue = [Rhythm[], React.Dispatch<RhythmsReducerAction>];

const RhythmsContext = createContext([
  [],
  (payload: RhythmsReducerAction) => {},
] as RhythmsContextValue);

function rhythmsReducer(rhythms: Rhythm[], action: RhythmsReducerAction) {
  switch (action.type) {
    case 'CREATE': {
      const { rhythm } = action.payload;

      const updated = produce(rhythms, (draft) => {
        draft.push({
          id: nanoid(),
          ...rhythm,
        });
      });

      setLocalStorageRhythms(updated);
      return updated;
    }

    case 'UPDATE': {
      const { id, partial } = action.payload;

      const updated = produce(rhythms, (draft) => {
        const foundRhythm = draft.find((rhythm) => rhythm.id === id);

        if (!foundRhythm) {
          throw new Error(`Unable to find rhythm with id ${id}`);
        }

        for (const prop in partial) {
          foundRhythm[prop] = partial[prop];
        }
      });

      setLocalStorageRhythms(updated);
      return updated;
    }

    case 'DELETE': {
      const { id } = action.payload;

      const updated = produce(rhythms, (draft) => {
        return draft.filter((rhythm) => rhythm.id !== id);
      });

      setLocalStorageRhythms(updated);
      return updated;
    }

    case 'HIT_TODAY': {
      const { id, hitToday } = action.payload;

      const updated = produce(rhythms, (draft) => {
        const foundRhythm = draft.find((rhythm) => rhythm.id === id);

        if (!foundRhythm) {
          throw new Error(`Unable to find rhythm with id ${id}`);
        }

        const hitOccurredToday = (hit) => {
          return isWithinInterval(hit, {
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
          });
        };

        // filter out all hits that did not happen today ...
        const filteredHits = foundRhythm.hits.filter(
          (hit) => !hitOccurredToday(hit)
        );

        // ... and add back hit for today if applicable
        if (hitToday) {
          filteredHits.push(new Date());
        }

        foundRhythm.hits = filteredHits;
      });

      setLocalStorageRhythms(updated);
      return updated;
    }
  }
}

export const RhythmsProvider = ({ children }: ReactChildrenProps) => {
  const initialRhythms = initializeRhythms();
  const [rhythms, dispatch] = useReducer(rhythmsReducer, initialRhythms);

  return (
    <RhythmsContext.Provider value={[rhythms, dispatch]}>
      {children}
    </RhythmsContext.Provider>
  );
};

export const useRhythms = () => useContext<RhythmsContextValue>(RhythmsContext);
