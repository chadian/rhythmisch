import Head from "next/head";
import { useState } from "react";
import { useRhythms, RhythmsProvider } from "../hooks/rhythms/index";
import RhythmEdit from "../components/rhythm-edit/rhythm-edit";
import Stripe from "../components/stripe";
import Modal from "../components/modal";
import Button from "../components/button";
import RhythmsList from '../components/rhythm-list';

function emptyRhythm() {
  return {
    action: "",
    frequency: [1, 1],
    reason: "",
    hits: [],
  };
}

export default function Home() {
  const [modalIsOpen, setModal] = useState(false);
  const [rhythmToEdit, setRhythmToEdit] = useState();
  const [, rhythmsDispatch] = useRhythms();

  const onRhythmEdit = (rhythm) => {
    setModal(true);
    setRhythmToEdit(rhythm);
  };

  return (
    <>
      <Head>
        <title>Rhythmisch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        {modalIsOpen ? (
          <Modal>
            <div style={{ marginTop: "-15%" }}>
              <RhythmEdit
                rhythm={rhythmToEdit}
                onClose={() => setModal(false)}
                onSubmit={(rhythm) => {
                  setModal(false);
                  setRhythmToEdit(null);

                  if (!rhythm.id) {
                    rhythmsDispatch({ type: "CREATE", payload: { rhythm } });
                  } else {
                    rhythmsDispatch({
                      type: "UPDATE",
                      payload: { id: rhythm.id, partial: rhythm },
                    });
                  }
                }}
              />
            </div>
          </Modal>
        ) : null}

        <div className="container m-auto min-h-screen relative pb-16">
          <Stripe />
          <header className="py-20">
            <h1 className="max-w-2xl text-7xl font-bold ">Rhythmisch</h1>
          </header>

          <main>
            <div className="mb-6">
              <Button
                size="large"
                onClick={() => {
                  setModal(true);
                  setRhythmToEdit(emptyRhythm());
                }}
              >
                Add
              </Button>
            </div>
            <RhythmsList onEdit={onRhythmEdit}/>
          </main>
        </div>
    </>
  );
}
