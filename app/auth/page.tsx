'use client';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {Button, Divider, HStack, Heading, VStack} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Auth2FA from './components/Auth2FA';
import {is2FANeededSelector, jwtSelector, set2fa} from '@/lib/redux';
import {useRouter} from 'next/navigation';
import {useSearchParams} from 'next/navigation';
import {useAppDispatch} from '@/lib/redux/hook';
import {HttpAuth42} from '@/shared/HttpEndpoints/auth';

export default function IndexPage() {
  const is2FA = useSelector(is2FANeededSelector);
  const jwt = useSelector(jwtSelector);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (jwt) router.push('/');
  }, [jwt]);

  useEffect(() => {
    const auth2FACode = searchParams.get('auth2FACode');
    const userIdString = searchParams.get('userId');
    const userId = userIdString ? parseInt(userIdString) : undefined;
    if (auth2FACode && userId) dispatch(set2fa({auth2FACode, userId, isSignUp: false}));
    router.push('/auth');
  }, []);

  return (
    <VStack spacing="48px">
      <Heading as="h1">Auth</Heading>
      {is2FA ? (
        <Auth2FA />
      ) : (
        <>
          <HStack spacing="24px">
            <SignIn />
            <Divider orientation="vertical" height={200} />
            <SignUp />
          </HStack>
          <Button
            type="button"
            onClick={() => router.push(`http://localhost:3333${HttpAuth42.endPointFull}`)}>
            Connect with your 42 account
          </Button>
        </>
      )}
    </VStack>
  );
}
