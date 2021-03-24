import dynamic from "next/dynamic";
import "../styles/globals.css";
import { RhythmsProvider } from "../hooks/rhythms/index";
import { ThemeProvider } from "../hooks/theme/index";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <RhythmsProvider>
        <Component {...pageProps} />
      </RhythmsProvider>
    </ThemeProvider>
  );
}

export default MyApp;
