import "../styles/globals.css";
import { RhythmsProvider } from "../hooks/rhythms/index";
import { ThemeProvider } from "../hooks/theme/index";
import Link from '../components/link';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <RhythmsProvider>
        <div className="container m-auto px-4 md:px-3">
          <div className="pr-6 md:pr-12 pb-16 min-h-screen relative">
            <header className="pt-20 mb-5">
              <h1 className="max-w-2xl text-6xl md:text-7xl font-bold ">
                Rhythmisch
              </h1>
            </header>
            <Component {...pageProps} />
            <footer className="fixed bottom-0 mb-3">
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
