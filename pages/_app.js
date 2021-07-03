import React from 'react';
import '../styles/globals.css';
import dynamic from 'next/dynamic';
import { RhythmsProvider } from '../hooks/rhythms/index';
import { ThemeProvider } from '../hooks/theme/index';
import Link from '../components/link';
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function NextApp({ Component, pageProps }) {
  useEffect(() => {
    // This prevents a vertical shift of content when navigating
    // between pages that show/hide the scrollbar
    // https://css-tricks.com/elegant-fix-jumping-scrollbar-issue/
    document.body.style.paddingLeft = 'calc(100vw - 100%)';
  });

  const HARDCODED_FIXED_FOOTER_PADDING = 'pb-32';

  return (
    <ThemeProvider>
      <RhythmsProvider>
        <div className="container m-auto">
          <div
            className={`flex flex-col mx-4 md:mx-3 pr-6 min-h-screen relative ${HARDCODED_FIXED_FOOTER_PADDING}`}
          >
            <header className="pt-12 mb-8">
              <div className="text-5xl md:text-7xl font-bold">Rhythmisch</div>
            </header>
            <Component {...pageProps} />
            <footer className="fixed h-24 flex flex-col items-baseline justify-between z-20 container bottom-0 py-4 border-t-4 bg-white ">
              <div className="flex space-x-5">
                <Link
                  href="/home"
                  underlineOffset="md"
                  attrs={{ className: 'text-lg md:text-xl' }}
                >
                  Home
                </Link>
                <Link
                  href="/app"
                  underlineOffset="md"
                  attrs={{ className: 'text-lg md:text-xl' }}
                >
                  App
                </Link>
                <Link
                  href="/faq"
                  underlineOffset="md"
                  attrs={{ className: 'text-lg md:text-xl' }}
                >
                  FAQ
                </Link>
              </div>
              <div className="text-gray-600">
                ❤️{' '}
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
