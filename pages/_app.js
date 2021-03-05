import '../styles/globals.css'
import { RhythmsProvider } from "../hooks/rhythms/index";

function MyApp({ Component, pageProps }) {
  return (
    <RhythmsProvider>
      <Component {...pageProps} />
    </RhythmsProvider>
  );
}

export default MyApp
