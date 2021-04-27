import dynamic from "next/dynamic";
import { useState } from "react";
import { useTheme } from "../hooks/theme/index";
import Link from "../components/link";
import Occurrence from "../components/rhythm/occurrence";
import Rhythm from "../components/rhythm/rhythm";
import Stripe from "../components/stripe";
import { subDays } from "date-fns";


function Highlight({ children }) {
  const [theme] = useTheme();

  return <span className={`${theme.linkColor} text-bold`}>
    {children}
  </span>;
}

export function Home() {
  const [cooldown, setCooldown] = useState(0);
  const [theme] = useTheme();

  return (
    <>
      <main className="grid gap-16 grid-cols-1">
        <div className="grid gap-9">
          <h2 className="text-5xl text-gray-800">Let's get rhythmical</h2>
          <p className="text-3xl text-gray-700">
            Rhythmisch is an app to help you build habits.
            <br />
            <Link href="/app">Check out the app.</Link>
          </p>
        </div>

        <section className="grid gap-6">
          <h3 className="text-3xl text-gray-800 font-bold">
            🏗 Built for clarity
          </h3>
          <p className="text-xl text-gray-700">
            Building habits isn't about leaderboards, metrics, charts or beating
            streaks. It's about{" "}
            <Highlight>building a pattern of daily commitments.</Highlight> A{" "}
            <em>Rhythm</em> at a glance tell you what you're aiming for, how
            often, and why.
            <br />
            <br />
            Here's an example of a rhythm
          </p>

          <div className="transform scale-50 px-2 -my-9">
            <Rhythm
              rhythm={{
                frequency: [1, 4],
                action: "Run",
                reason: "I want to run a marathon this year",
                hits: [subDays(new Date(), 2), subDays(new Date(), 11)],
              }}
            />
          </div>

          <p className="text-xl text-gray-700">
            Each cirlce represents a day giving you a window into the last two
            weeks and how you're doing. Days you've hit will show up solid
            colored circle with a slow cooldown based on the rhythm's frequency.
          </p>
        </section>

        <section className="grid gap-3 grid-cols-1">
          <h3 className="text-3xl text-gray-800 font-bold">
            🎯 Focus on today
          </h3>
          <p className="text-xl text-gray-700">
            Do not miss your chance, today is all there is. Inside the stripe
            is a marker each <em>Rhythm</em>: solid means you've done it for
            today, blurry means it's still an open opportunity.
          </p>
          <div className="flex pt-4">
            <div className="relative flex h-24 m-auto">
              <p className="m-auto text-lg m-auto text-gray-500 mr-16">
                <span className="font-bold">Go ahead, give it a click!</span>
                <br />(
                {cooldown === 1 ? (
                  <span className={theme.buttonTextColor}>
                    You've done it
                  </span>
                ) : (
                  "Not yet done for today"
                )}
                )
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
          </div>
        </section>

        <section className="grid gap-3 grid-cols-1">
          <h3 className="text-3xl text-gray-800 font-bold">
            🗑 Ephemeral by design
          </h3>
          <p className="text-xl text-gray-700">
            All Rhythms eventually go away. Haven't touched a rhythm in a few
            weeks? Rhythmisch will automatically remove it for you. And if
            you've built up the rhythm into a habit go ahead and delete it
            yourself, congratulations!
          </p>
        </section>

        <section className="grid gap-3 grid-cols-1">
          <h3 className="text-3xl text-gray-800 font-bold">
            📱 Your device, your data
          </h3>
          <p className="text-xl text-gray-700">
            This app uses a browser technology called local storage which means
            all data is stored local to your device for that browser.{" "}
            <Highlight>
              None of your data is ever stored on a server or sent over the web.
            </Highlight>
          </p>
        </section>

        <section className="grid gap-3 grid-cols-1">
          <h3 className="text-3xl text-gray-800 font-bold">🕊 Open & Free</h3>
          <p className="text-xl text-gray-700">
            Want to take a peak at how Rhythmisch works? Check out the code
            on&nbsp;
            <Link href="https://github.com/chadian/rhythmisch">Github</Link>.
            Because the app is entirely ran on your device there are no costs or
            overhead which means the app can be offered for free.
          </p>
        </section>
      </main>
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
