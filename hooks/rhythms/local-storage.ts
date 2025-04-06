import { produce } from 'immer';
import { formatISO, parseISO } from 'date-fns';
import { Rhythm } from '../../types';

const RHYTHMS_LOCAL_STORAGE_KEY = 'app.rhythms';

type LocalStorageRhythm = Omit<Rhythm, 'hits'> & { hits: string[] };

export function getLocalStorageRhythms(): Rhythm[] | void {
  try {
    const jsonData = window.localStorage.getItem(RHYTHMS_LOCAL_STORAGE_KEY);
    let rhythms = JSON.parse(jsonData) as LocalStorageRhythm[];

    if (!Array.isArray(rhythms)) {
      return;
    }

    const parsedRhythms: Rhythm[] = rhythms.map((rhythm) => {
      const parsedHits = rhythm.hits.map((isoString: string) =>
        parseISO(isoString)
      );
      (rhythm as unknown as Rhythm).hits = parsedHits;
      return rhythm as unknown as Rhythm;
    });

    return parsedRhythms;
  } catch {
    return;
  }
}

export function setLocalStorageRhythms(rhythms: Rhythm[]): void {
  const serializedRhythms = produce(rhythms, (draft) => {
    for (const rhythm of draft) {
      (rhythm as unknown as LocalStorageRhythm).hits = rhythm.hits.map(
        (date) => {
          return formatISO(date);
        }
      );
    }
  }) as unknown as LocalStorageRhythm[];

  window.localStorage.setItem(
    RHYTHMS_LOCAL_STORAGE_KEY,
    JSON.stringify(serializedRhythms)
  );
}
