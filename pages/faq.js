import { useTheme } from "../hooks/theme/index";
import Link from "../components/link";
import Stripe from "../components/stripe";
import Occurrence from "../components/rhythm/occurrence";

export default function Home() {
  const [theme] = useTheme();

  return (
    <>
      <main className="mt-9 grid gap-9 grid-cols-1">
        <h2 className="text-5xl text-gray-800">Faq</h2>
      </main>
    </>
  );
}
