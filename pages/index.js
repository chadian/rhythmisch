import Head from "next/head";
import styles from "../styles/Home.module.css";
import Rhythm from "../components/rhythm/rhythm";
import RhythmEdit from "../components/rhythm-edit";
import Stripe from "../components/stripe";
import Modal from "../components/modal";
import { useState } from "react";

export default function Home() {
  const [modalIsOpen, setModal] = useState(false);
  const [rhythmToEdit, setRhythmToEdit] = useState();
  const [rhythm, setRhythm] = useState({
    action: "Drink water every 8 hours",
    frequency: "once every day",
    reason: "because my body needs it",
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {modalIsOpen ? (
        <Modal>
          <RhythmEdit
            rhythm={rhythmToEdit}
            onClose={() => setModal(false)}
            onUpdate={(rhythm) => {
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
