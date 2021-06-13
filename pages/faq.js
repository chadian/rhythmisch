import React from "react";
import {
  SectionHeading,
  SectionParagraph,
} from "../components/content/section";
import Link from "../components/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col space-y-16">
        <section>
          <h2 className="text-5xl text-gray-800">FAQ</h2>
        </section>

        <section>
          <SectionHeading>Q: What does Rhythmisch mean?</SectionHeading>
          <SectionParagraph>
            A: It's a German word that translates to <em>Rhythmical</em>.
          </SectionParagraph>
        </section>

        <section>
          <SectionHeading>
            Q: Can I use Rhythmisch on another device?
          </SectionHeading>
          <SectionParagraph>
            A: Rhythmisch data is stored locally on your device using a browser
            technology called{" "}
            <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">
              local storage
            </Link>
            . Each browser, on <em>each device</em>, has its own local storage.
            You can use Rhythmisch on different browsers and different devices
            but the data won't be synced or shared.
          </SectionParagraph>
        </section>

        <section>
          <SectionHeading>Q: Why is the app so limited?</SectionHeading>
          <SectionParagraph>
            A: The hope is that with these limitations that there is less
            distractions and that you're able to easily kickstart the habit into
            action. Once you're rolling there are plenty of other apps, tools,
            techniques to upgrade to that provide more advanced features. That
            said, feel free to reach out on{" "}
            <Link href="https://twitter.com/chadian">twitter</Link> with any
            ideas, I would still love to hear them.
          </SectionParagraph>
        </section>

        <section>
          <SectionHeading>
            Q: My question wasn't answered, can I get some help?
          </SectionHeading>
          <SectionParagraph>
            A: Sure, send me a question or feedback on{" "}
            <Link href="https://twitter.com/chadian">twitter</Link>.
          </SectionParagraph>
        </section>
      </main>
    </>
  );
}
