import "../styles/globals.css";
import { RhythmsProvider } from "../hooks/rhythms/index";
import { ThemeProvider } from "../hooks/theme/index";
import Link from '../components/link';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <RhythmsProvider>
        <div className="container relative m-auto">
          <div className="mx-4 md:mx-3 pr-6 pb-32 min-h-screen relative">
            <header className="pt-20 mb-5">
              <h1 className="max-w-2xl text-6xl md:text-7xl font-bold">
                Rhythmisch
              </h1>
            </header>
            <Component {...pageProps} />
            <footer className="sticky container bottom-0 mt-12 py-3 border-t-4 bg-white">
              <div className="flex space-x-5 mb-3">
                <Link
                  href="/home"
                  underlineOffset="md"
                  attrs={{ className: "text-xl" }}
                >
                  Home
                </Link>
                <Link
                  href="/app"
                  underlineOffset="md"
                  attrs={{ className: "text-xl" }}
                >
                  App
                </Link>
                <Link
                  href="/faq"
                  underlineOffset="md"
                  attrs={{ className: "text-xl" }}
                >
                  Faq
                </Link>
              </div>
              <div className="text-gray-600">❤️ from Sozial</div>
            </footer>
          </div>
        </div>
      </RhythmsProvider>
    </ThemeProvider>
  );
}

export default MyApp;
