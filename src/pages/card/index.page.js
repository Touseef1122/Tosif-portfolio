import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function CardIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/card/alishbah-touseef');
  }, [router]);

  return null;
}
