import Head from "next/head";
import { useState } from "react";
import { startOfDay, endOfDay, isWithinInterval } from "date-fns";
import styles from "../styles/Home.module.css";
import buttonStyles from "../styles/buttons.module.css";
import Rhythm from "../components/rhythm/rhythm";
import RhythmEdit from "../components/rhythm-edit";
import Stripe from "../components/stripe";
import Modal from "../components/modal";
import { nanoid } from 'nanoid'

function newRhythm(id = undefined) {
  return {
    id,
    action: "",
    frequency: [1, 1],
    reason: "",
    hits: [],
  }
}

export default function Home() {
  const [modalIsOpen, setModal] = useState(false);
  const [rhythmToEdit, setRhythmToEdit] = useState();
  const [rhythms, setRhythms] = useState([{
    id: nanoid(),
    action: "Use Rhythmisch",
    frequency: [1, 1],
    reason: "I want to get into the rhythm!",
    hits: [new Date('January 6, 2021')],
  }]);

  function addRhythm(rhythm) {
    if (!rhythm.id) {
      rhythm = {
        ...rhythm,
        id: nanoid(),
      }
    }

    const updatedRhythms = [
      ...rhythms,
      rhythm
    ];

    setRhythms(updatedRhythms);
  }

  function updateRhythm(id, rhythmPartial) {
    const foundRhythm = rhythms.find(rhythm => rhythm.id === id);

    if (!foundRhythm) {
      throw new Error(`Unable to find rhythm with id ${id}`);
    }

    const updatedRhythm = {
      ...foundRhythm,
      ...rhythmPartial,
    };

    const updatedRhythms = rhythms.reduce((rhythms, rhythm) => {
      if (rhythm.id === updatedRhythm.id) {
        rhythms.push(updatedRhythm);
      } else {
        rhythms.push(rhythm);
      }

      return rhythms;
    }, []);

    setRhythms(updatedRhythms);
  }

  const setTodaysHit = (rhythm, hasHit) => {
    const hits = [...rhythm.hits].filter((hit) => {
      return !isWithinInterval(hit, {
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
      });
    });

    if (hasHit){
      hits.push(new Date());
    }

    updateRhythm(rhythm.id, {
      hits
    });
  };

  return (
    <>
      <Head>
        <title>Rhythmisch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {modalIsOpen ? (
        <Modal>
          <RhythmEdit
            rhythm={rhythmToEdit}
            onClose={() => setModal(false)}
            onSubmit={(rhythm) => {
              setModal(false);
              setRhythmToEdit(null);

              if (!rhythm.id) {
                addRhythm(rhythm);
              } else {
                updateRhythm(rhythm.id, rhythm);
              }
            }}
          />
        </Modal>
      ) : null}

      <div className={styles.stage}>
        <div className={styles.container}>
          <header className={styles["header"]}>
            <div className="text-7xl font-bold">Rhythmisch</div>
            <button
              className={buttonStyles["button-tiny"]}
              onClick={() => {
                setModal(true);
                setRhythmToEdit(newRhythm());
              }}
            >
              Add
            </button>
          </header>
          <Stripe />
          <main className={styles["rhythms"]}>
            {rhythms.map((rhythm) => {
              return (
                <Rhythm
                  key={rhythm.id}
                  rhythm={rhythm}
                  onTodaysOccurrenceToggle={(wasHit) =>
                    setTodaysHit(rhythm, wasHit)
                  }
                  onEdit={(rhythm) => {
                    setModal(true);
                    setRhythmToEdit(rhythm);
                  }}
                />
              );
            })}
          </main>
        </div>
      </div>
    </>
  );
}
