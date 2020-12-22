import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Rhythm from '../components/rhythm/rhythm';
import RhythmEdit from '../components/rhythm-edit';
import Stripe from '../components/stripe';
import Modal from '../components/modal';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal>
        <RhythmEdit/>
      </Modal>

      <main className={styles.main}>
        <Rhythm action="Drink water every 8 hours" frequency="once every day" reason="because my body needs it" />
        <Stripe/>
      </main>
    </div>
  );
}
