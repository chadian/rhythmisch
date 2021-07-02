import produce from 'immer';
import { formatISO, parseISO } from 'date-fns';

const RHYTHMS_LOCAL_STORAGE_KEY = 'app.rhythms';

export function getLocalStorageRhythms() {
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

export function setLocalStorageRhythms(rhythms) {
  const updated = produce(rhythms, (draft) => {
    for (const rhythm of draft) {
      rhythm.hits = rhythm.hits.map((date) => {
        return formatISO(date);
      });
    }
  });

  window.localStorage.setItem(
    RHYTHMS_LOCAL_STORAGE_KEY,
    JSON.stringify(updated)
  );
}
