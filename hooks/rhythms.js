import React, { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";

const RHYTHMS_LOCAL_STORAGE_KEY = "app.rhythms";

const defaultRhythm = {
  id: nanoid(),
  action: "Use Rhythmisch",
  frequency: [1, 1],
  reason: "I want to get into the rhythm",
  hits: [new Date("January 6, 2021")],
};

const RhythmsContext = createContext();

export const RhythmsProvider = ({ children }) => {
  let rhythms = [];
  let setRhythms = () => {};

  // with the `window` object we're in the browser
  // otherwise we're it's being SSR'd
  // TODO: Turn off SSR for what ends up being the
  // app route
  if (typeof window !== 'undefined') {
    const localRhythms = JSON.parse(
      window.localStorage.getItem(RHYTHMS_LOCAL_STORAGE_KEY)
    ) || [defaultRhythm];

    const [rhythmsState, setRhythmsState] = useState(localRhythms);
    rhythms = rhythmsState;

    setRhythms = (rhythms) => {
      setRhythmsState(rhythms);
      window.localStorage.setItem(RHYTHMS_LOCAL_STORAGE_KEY, JSON.stringify(rhythms));
    }
  }

  return (
    <RhythmsContext.Provider value={[rhythms ?? [], setRhythms ?? (() => {})]}>
      {children}
    </RhythmsContext.Provider>
  );
};

export const useRhythms = () => useContext(RhythmsContext);
