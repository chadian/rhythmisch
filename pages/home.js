import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '../hooks/theme/index';
import Link from '../components/link';
import Occurrence from '../components/rhythm/occurrence';
import Rhythm from '../components/rhythm/rhythm';
import Stripe from '../components/stripe';
import { subDays } from 'date-fns';
import {
  SectionHeading,
  SectionParagraph,
} from '../components/content/section';

function Highlight({ children }) {
  const [theme] = useTheme();

  return <span className={`${theme.linkColor} text-bold`}>{children}</span>;
}

export function Home() {
  const [cooldown, setCooldown] = useState(0);
  const [theme] = useTheme();

  return (
    <main className="flex flex-col space-y-16">
      <section>
        <h2 className="text-5xl text-gray-800">Let's get rhythmical</h2>
        <p className="text-3xl text-gray-700 mt-5">
          Rhythmisch is an app to help you build habits.{' '}
          <Link attrs={{ className: 'whitespace-nowrap' }} href="/app">
            Check out the app.
          </Link>
        </p>
      </section>

      <section>
        <SectionHeading>Keep it simple</SectionHeading>
        <SectionParagraph>
          No accounts, streaks, leaderboards, metrics or anything else to get in
          the way. It's ready for you to{' '}
          <Link href="/app">get started now</Link>. Your data is stored on your
          device and is never sent anywhere.
        </SectionParagraph>
      </section>

      <section>
        <SectionHeading>Habits built on Rhythms</SectionHeading>
        <SectionParagraph>
          A <em>rhythm</em> represents the habit you are trying to build.{' '}
          <Highlight>What, how often, and why.</Highlight>
        </SectionParagraph>
        <div className="transform scale-50 px-2 my-2">
          <Rhythm
            rhythm={{
              frequency: [1, 4],
              action: 'Run',
              reason: 'I want to run a marathon this year',
              hits: [subDays(new Date(), 2), subDays(new Date(), 11)],
            }}
          />
        </div>
        <SectionParagraph>
          The 14 horizontal dots represent a two week window into your progress.
          A solid dot represents a day where a habit has been completed, and the
          following days represent the cooldown based on the rhythm frequency.
        </SectionParagraph>
      </section>

      <section>
        <SectionHeading>Focus on today</SectionHeading>
        <SectionParagraph>
          Rhythmisch gives you{' '}
          <Highlight>
            <strong>one</strong> daily target
          </Highlight>{' '}
          to track per rhythm. Each rhythm has a circle in a stripe, solid when
          it's completed and blurry when it isn't.
        </SectionParagraph>
        <div className="relative flex h-24">
          <p className="my-auto text-lg text-gray-500 mr-16">
            <strong>Go ahead give the test target a click! 👉</strong>
            <br />
            Current status:{' '}
            {cooldown === 1 ? (
              <span className={theme.buttonTextColor}>
                <strong>You've done it</strong>
              </span>
            ) : (
              'Not yet done for today'
            )}
          </p>
          <div className="z-30 absolute right-2 md:right-3 top-9">
            <Occurrence
              cooldown={cooldown}
              onClick={() => setCooldown(cooldown === 0 ? 1 : 0)}
              open={true}
              date={new Date()}
            />
          </div>
          <Stripe />
        </div>
      </section>

      <section>
        <SectionHeading>Open and Free</SectionHeading>
        <SectionParagraph>
          Rhythmisch does not cost anything and the code is open source on{' '}
          <Link href="https://github.com/chadian/rhythmisch">GitHub</Link>.
        </SectionParagraph>
      </section>

      <section>
        <SectionHeading>Thoughts?</SectionHeading>
        <SectionParagraph>
          Learn more about the app on the <Link href="/faq">FAQ page</Link>.
          Send any questions or comments to me on{' '}
          <Link href="https://twitter.com/chadian">twitter</Link>.
        </SectionParagraph>
      </section>
    </main>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
