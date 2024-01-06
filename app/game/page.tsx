'use client';

import {useAppSelector} from '@/lib/redux/hook';
import {authTokenSelector} from '@/lib/redux';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import Loading from '../components/global/Loading';

export default function IndexPage() {
  return (
    <>
      <h1>Game Page</h1>
    </>
  );
}
