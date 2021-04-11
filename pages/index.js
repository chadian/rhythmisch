import dynamic from 'next/dynamic'
import Head from "next/head";
import { useState } from "react";
import { useRhythms } from "../hooks/rhythms/index";
import RhythmEdit from "../components/rhythm-edit/rhythm-edit";
import Stripe from "../components/stripe";
import Modal from "../components/modal";
import Button from "../components/button";
import Link from "../components/link";
import RhythmsList from '../components/rhythm-list';
import ThemeSelector from '../components/theme-selector';

function createNewRhythm() {
  return {
    action: "",
    frequency: [1, 1],
    reason: "",
    hits: [],
  };
}

function RhythmischApp() {
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

      <Stripe />

      <div className="mb-20 flex space-x-6">
        <ThemeSelector />
      </div>

      <main>
        <div className="mb-6">
          <Button
            size="large"
            onClick={() => {
              setModal(true);
              setRhythmToEdit(createNewRhythm());
            }}
          >
            Add
          </Button>
        </div>
        <RhythmsList onEdit={onRhythmEdit} />
      </main>
    </>
  );
}

export default dynamic(() => Promise.resolve(RhythmischApp), { ssr: false });
