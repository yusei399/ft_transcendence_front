'use client';

import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useSearchParams} from 'next/navigation';
import {useAppDispatch} from '@/lib/redux/hook';
import {HttpAuth42} from '@/shared/HttpEndpoints/auth';
import {setLogInError} from './logUser';
import {Button} from '@chakra-ui/react';

export default function OAuth42() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const OAuth42Error = searchParams.get('OAuth42Error');
    if (OAuth42Error) {
      setLogInError(dispatch, '42 OAuth error: Unauthorized');
      router.replace('/auth');
    }
  }, []);

  return (
    <Button
      type="button"
      onClick={() => router.push(`http://localhost:3333${HttpAuth42.endPointFull}`)}>
      Connect with your 42 account
    </Button>
  );
}
