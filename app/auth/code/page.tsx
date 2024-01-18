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
    if (!userId || !code) return;
    verify42([{userId, code}])
      .unwrap()
      .then(res =>
        logUserIn(
          dispatch,
          {authToken: res.authToken, userId: res.userInfo.userId, refreshToken: res.refreshToken},
          false,
        ),
      )
      .then(() => router.replace('/', {scroll: false}))
      .catch(err => {
        console.error(err);
        router.replace('/auth', {scroll: false});
      });
  }, [userId, code]);

  return <Loading />;
}
