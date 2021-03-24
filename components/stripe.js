import { useTheme } from '../hooks/theme/index';

export default function Stripe() {
  const [theme] = useTheme();
  const { stripeBgClass } = theme;

  return (
    <div
      className={`absolute top-0 -right-12 ${stripeBgClass} w-12 h-full`}
    ></div>
  );
}
