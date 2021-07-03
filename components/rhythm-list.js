import React from 'react';
import Rhythm from './rhythm/rhythm';
import Button from './button';
import { useRhythms } from '../hooks/rhythms';

// eslint-disable-next-line react/prop-types
export default function RhythmList({ onEdit }) {
  const [rhythms, rhythmsDispatch] = useRhythms();

  const onTodayToggle = (rhythm, wasHit) => {
    return rhythmsDispatch({
      type: 'HIT_TODAY',
      payload: { id: rhythm.id, hitToday: wasHit },
    });
  };

  const rhythmsList = rhythms.map((rhythm) => {
    return (
      <div key={rhythm.id}>
        <Rhythm
          rhythm={rhythm}
          onTodaysOccurrenceToggle={(wasHit) => onTodayToggle(rhythm, wasHit)}
        />
        <div className="mt-1 md:mt-3 space-x-5">
          <Button size="small" onClick={() => onEdit(rhythm)}>
            Edit
          </Button>
          <Button
            size="small"
            onClick={() =>
              rhythmsDispatch({
                type: 'DELETE',
                payload: { id: rhythm.id },
              })
            }
          >
            Remove
          </Button>
        </div>
      </div>
    );
  });

  const emptyRhythms = (
    <div className="bg-gray-100 text-gray-700 p-6 mr-10 text-xl ">
      All out of rhythms, enjoy some fresh air 💜
    </div>
  );

  return (
    <div className="space-y-10 md:space-y-20">
      {rhythms.length === 0 ? emptyRhythms : rhythmsList}
    </div>
  );
}
