import "../styles/globals.css";
import dynamic from "next/dynamic";
import { RhythmsProvider } from "../hooks/rhythms/index";
import { ThemeProvider } from "../hooks/theme/index";
import Link from "../components/link";

function NextApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <RhythmsProvider>
        <div className="container relative m-auto">
          <div className="mx-4 md:mx-3 pr-6 pb-2 min-h-screen relative">
            <header className="pt-20 mb-5">
              <h1 className="max-w-2xl text-5xl md:text-7xl font-bold">
                Rhythmisch
              </h1>
            </header>
            <Component {...pageProps} />
            <footer className="fixed -inset-x-0 flex md:flex-col items-baseline justify-between z-20 container bottom-0 px-3 py-1 md:py-3 border-t-4 bg-white">
              <div className="flex space-x-5 mb-1 md:mb-3">
                <Link
                  href="/home"
                  underlineOffset="md"
                  attrs={{ className: "text-lg md:text-xl" }}
                >
                  Home
                </Link>
                <Link
                  href="/app"
                  underlineOffset="md"
                  attrs={{ className: "text-lg md:text-xl" }}
                >
                  App
                </Link>
                <Link
                  href="/faq"
                  underlineOffset="md"
                  attrs={{ className: "text-lg md:text-xl" }}
                >
                  Faq
                </Link>
              </div>
              <div className="text-gray-600">
                ❤️{" "}
                <Link href="https://sticksnglue.com" underlineOffset="md">
                  sticksnglue
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </RhythmsProvider>
    </ThemeProvider>
  );
}

export default dynamic(() => Promise.resolve(NextApp), { ssr: false });
