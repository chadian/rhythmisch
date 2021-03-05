import { nanoid } from "nanoid";
import { getLocalStorageRhythms, setLocalStorageRhythms } from './local-storage';

export function initializeRhythms() {
  let rhythms = [];

  // with the `window` object we're in the browser
  // otherwise we're it's being SSR'd
  // TODO: Turn off SSR for what ends up being the
  // app route
  if (typeof window !== "undefined") {
    const localStorageRhythms = getLocalStorageRhythms();

    if (localStorageRhythms) {
      rhythms = localStorageRhythms;
    } else {
      const defaultRhythm = {
        id: nanoid(),
        action: "Use Rhythmisch",
        frequency: [1, 1],
        reason: "I want to get into the rhythm",
        hits: [],
      };

      setLocalStorageRhythms([defaultRhythm]);
      rhythms = getLocalStorageRhythms();
    }
  }

  return rhythms;
}
