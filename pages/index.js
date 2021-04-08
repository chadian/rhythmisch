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

      <div className="container m-auto px-4 md:px-3">
        <div className="pr-12 pb-16 min-h-screen relative">
          <Stripe />
          <header className="py-20">
            <h1 className="max-w-2xl text-6xl md:text-7xl font-bold ">
              Rhythmisch
            </h1>
            <div className="mt-3 flex space-x-6">
              <ThemeSelector />
            </div>
          </header>

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

          <footer className="fixed bottom-0 mb-3">
            <div className="flex space-x-5 mb-3">
              <Link underlineOffset="md" attrs={{ className: "text-xl" }}>
                Home
              </Link>
              <Link underlineOffset="md" attrs={{ className: "text-xl" }}>
                App
              </Link>
            </div>
            <div className="text-gray-600">❤️ from Sozial</div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(RhythmischApp), { ssr: false });
