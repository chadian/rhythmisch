import Head from "next/head";
import { useState } from "react";
import { startOfDay, endOfDay, isWithinInterval } from "date-fns";
import styles from "../styles/Home.module.css";
import Rhythm from "../components/rhythm/rhythm";
import RhythmEdit from "../components/rhythm-edit";
import Stripe from "../components/stripe";
import Modal from "../components/modal";

export default function Home() {
  const [modalIsOpen, setModal] = useState(false);
  const [rhythmToEdit, setRhythmToEdit] = useState();
  const [rhythm, setRhythm] = useState({
    action: "Drink water every 8 hours",
    frequency: [1, 1],
    reason: "my body needs it",
    hits: [new Date('January 6, 2021')],
  });

  const setTodaysHit = (hasHit) => {
    const hits = [...rhythm.hits].filter((hit) => {
      return !isWithinInterval(hit, {
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
      });
    });

    if (hasHit){
      hits.push(new Date());
    }

    setRhythm({
      ...rhythm,
      hits,
    })
  };

  return (
    <div className={styles.container}>
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
              setRhythm(rhythm);
            }}
          />
        </Modal>
      ) : null}

      <main className={styles.main}>
        <Rhythm
          rhythm={rhythm}
          onTodaysHit={setTodaysHit}
          onEdit={(rhythm) => {
            setModal(true);
            setRhythmToEdit(rhythm);
          }}
        />
        <Stripe />
      </main>
    </div>
  );
}
