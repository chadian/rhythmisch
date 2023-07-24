import { useRouter } from 'next/router';
import { getLocalStorageRhythms } from '../hooks/rhythms/local-storage';

export default function Index() {
  const router = useRouter();
  const rhythms = getLocalStorageRhythms();
  const hasUsedApp = rhythms !== undefined;
  const inBrowser = typeof window !== 'undefined';

  if (inBrowser) {
    if (hasUsedApp) {
      router.push('/app');
    } else {
      router.push('/home');
    }
  }

  return null;
}
