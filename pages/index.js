import Head from "next/head";
import { useState } from "react";
import { useRhythms, RhythmsProvider } from "../hooks/rhythms/index";
import Rhythm from "../components/rhythm/rhythm";
import RhythmEdit from "../components/rhythm-edit";
import Stripe from "../components/stripe";
import Modal from "../components/modal";
import Button from "../components/button";

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
  const [rhythms, rhythmsDispatch] = useRhythms();

  return (
    <>
      <Head>
        <title>Rhythmisch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RhythmsProvider>
        {modalIsOpen ? (
          <Modal>
            <div style={{ marginTop: '-15%' }}>
              <RhythmEdit
                rhythm={rhythmToEdit}
                onClose={() => setModal(false)}
                onSubmit={(rhythm) => {
                  setModal(false);
                  setRhythmToEdit(null);

                  if (!rhythm.id) {
                    rhythmsDispatch({ type: 'CREATE', payload: { rhythm } });
                  } else {
                    rhythmsDispatch({ type: "UPDATE", payload: { id: rhythm.id, partial: rhythm } });
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
            <div className="space-y-20">
              {rhythms.map((rhythm) => {
                return (
                  <div key={rhythm.id}>
                    <Rhythm
                      rhythm={rhythm}
                      onTodaysOccurrenceToggle={(wasHit) =>
                        rhythmsDispatch({
                          type: "HIT_TODAY",
                          payload: { id: rhythm.id, hitToday: wasHit },
                        })
                      }
                    />
                    <div className="mt-3 space-x-5">
                      <Button
                        size="small"
                        onClick={() => {
                          setModal(true);
                          setRhythmToEdit(rhythm);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        onClick={() =>
                          rhythmsDispatch({
                            type: "DELETE",
                            payload: { id: rhythm.id },
                          })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </RhythmsProvider>
    </>
  );
}
