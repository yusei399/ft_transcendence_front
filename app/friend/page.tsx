'use client';

import {useAppSelector} from '@/lib/redux/hook';
import {jwtSelector} from '@/lib/redux';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function IndexPage() {
  const authToken = useAppSelector(jwtSelector);
  const router = useRouter();

  useEffect(() => {
    if (!authToken) router.push('/auth');
  }, [authToken]);

  if (!authToken) return <div>Redirecting...</div>;

  return (
    <>
      <h1>Friend Page</h1>
    </>
  );
}
