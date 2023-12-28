'use client';

import {useAppSelector} from '@/lib/redux/hook';
import {jwtSelector} from '@/lib/redux';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import Loading from '../components/global/Loading';

export default function IndexPage() {
  const authToken = useAppSelector(jwtSelector);
  const router = useRouter();

  useEffect(() => {
    if (!authToken) router.push('/auth');
  }, [authToken]);

  if (!authToken) return <Loading />;

  return (
    <>
      <h1>Game Page</h1>
    </>
  );
}
