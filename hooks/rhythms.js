import React, { createContext, useContext, useState } from "react";
import { formatISO, parseISO } from "date-fns";
import { nanoid } from "nanoid";

const RHYTHMS_LOCAL_STORAGE_KEY = "app.rhythms";
const RhythmsContext = createContext();

function getLocalStorageRhythms() {
  try {
    const jsonData = window.localStorage.getItem(RHYTHMS_LOCAL_STORAGE_KEY);
    let rhythms = JSON.parse(jsonData);

    if (!Array.isArray(rhythms)) {
      return;
    }

    rhythms = rhythms.map((rhythm) => {
      rhythm.hits = rhythm.hits.map(parseISO);
      return rhythm;
    });

    return rhythms;
  } catch {
    return;
  }
}

function setLocalStorageRhythms(rhythms) {
  rhythms = rhythms.map(rhythm => {
    rhythm.hits = rhythm.hits.map(formatISO);
    return rhythm;
  });

  window.localStorage.setItem(
    RHYTHMS_LOCAL_STORAGE_KEY,
    JSON.stringify(rhythms)
  );
}


export const RhythmsProvider = ({ children }) => {
  let rhythms = [];

  // with the `window` object we're in the browser
  // otherwise we're it's being SSR'd
  // TODO: Turn off SSR for what ends up being the
  // app route
  if (typeof window !== 'undefined') {
    const defaultRhythm = {
      id: nanoid(),
      action: "Use Rhythmisch",
      frequency: [1, 1],
      reason: "I want to get into the rhythm",
      hits: [new Date("January 6, 2021")],
    };

    rhythms = getLocalStorageRhythms() || [defaultRhythm];
  }

  const [, setRhythmsState] = useState(rhythms);

  const setRhythms = (rhythms) => {
    setRhythmsState(rhythms);
    setLocalStorageRhythms(rhythms);
  };

  return (
    <RhythmsContext.Provider value={[rhythms, setRhythms]}>
      {children}
    </RhythmsContext.Provider>
  );
};

export const useRhythms = () => useContext(RhythmsContext);
