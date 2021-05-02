import { useTheme } from "../hooks/theme/index";

export default function Home() {
  const [theme] = useTheme();

  return (
    <>
      <main>
        <h2 className="text-5xl text-gray-800">FAQ</h2>
      </main>
    </>
  );
}
