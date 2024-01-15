'use client';

import Loading from '@/app/components/global/Loading';
import {useVerify42Mutation} from '@/lib/redux/api';
import {useAppDispatch} from '@/lib/redux/hook';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect} from 'react';
import {logUserIn} from '../components/logUser';

export default function IndexPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userIdString = searchParams.get('userId');
  const userId = userIdString ? parseInt(userIdString) : undefined;
  const code = searchParams.get('_42AuthCode');
  const [verify42] = useVerify42Mutation();

  useEffect(() => {
    (async () => {
      try {
        if (!userId || !code) return;
        const res = await verify42([{userId, code}]).unwrap();
        logUserIn(dispatch, res, false);
      } catch (error) {
        router.push('/auth');
      }
    })();
  }, [userId, code]);

  return <Loading />;
}
