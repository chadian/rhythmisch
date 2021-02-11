import Head from "next/head";
import { useState } from "react";
import { startOfDay, endOfDay, isWithinInterval } from "date-fns";
import buttonStyles from "../styles/buttons.module.css";
import Rhythm from "../components/rhythm/rhythm";
import RhythmEdit from "../components/rhythm-edit";
import Stripe from "../components/stripe";
import Modal from "../components/modal";
import Button from '../components/button';
import { nanoid } from "nanoid";

function newRhythm(id = undefined) {
  return {
    id,
    action: "",
    frequency: [1, 1],
    reason: "",
    hits: [],
  };
}

export default function Home() {
  const [modalIsOpen, setModal] = useState(false);
  const [rhythmToEdit, setRhythmToEdit] = useState();
  const [rhythms, setRhythms] = useState([
    {
      id: nanoid(),
      action: "Use Rhythmisch",
      frequency: [1, 1],
      reason: "I want to get into the rhythm",
      hits: [new Date("January 6, 2021")],
    },
  ]);

  function addRhythm(rhythm) {
    if (!rhythm.id) {
      rhythm = {
        ...rhythm,
        id: nanoid(),
      };
    }

    const updatedRhythms = [...rhythms, rhythm];

    setRhythms(updatedRhythms);
  }

  function updateRhythm(id, rhythmPartial) {
    const foundRhythm = rhythms.find((rhythm) => rhythm.id === id);

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

    if (hasHit) {
      hits.push(new Date());
    }

    updateRhythm(rhythm.id, {
      hits,
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

      <div className="container m-auto">
        <div className="relative">
          <header className="pt-12">
            <h1 className="max-w-2xl text-7xl font-bold ">Rhythmisch</h1>
          </header>
          <Stripe />
          <main>
            <div className="my-6">
              <Button
                size="large"
                onClick={() => {
                  setModal(true);
                  setRhythmToEdit(newRhythm());
                }}
              >
                Add
              </Button>
            </div>
            <div className="space-y-16">
              {rhythms.map((rhythm) => {
                return (
                  <div key={rhythm.id}>
                    <Rhythm
                      rhythm={rhythm}
                      onTodaysOccurrenceToggle={(wasHit) =>
                        setTodaysHit(rhythm, wasHit)
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
                      <Button size="small">
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
