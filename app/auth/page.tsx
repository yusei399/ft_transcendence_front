'use client';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {Divider, HStack, Heading, VStack} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Auth2FA from './components/Auth2FA';
import {is2FANeededSelector, jwtSelector, set2fa} from '@/lib/redux';
import {useRouter} from 'next/navigation';
import {useSearchParams} from 'next/navigation';
import {useAppDispatch} from '@/lib/redux/hook';
import OAuth42 from './components/OAuth42';

export default function IndexPage() {
  const is2FA = useSelector(is2FANeededSelector);
  const jwt = useSelector(jwtSelector);
  const router = useRouter();

  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const auth2FACode = searchParams.get('auth2FACode');
    const userIdString = searchParams.get('userId');
    const userId = userIdString ? parseInt(userIdString) : undefined;

    if (auth2FACode && userId) {
      dispatch(set2fa({auth2FACode, userId, isSignUp: false}));
      router.replace('/auth');
    }
  }, []);

  useEffect(() => {
    if (jwt) router.push('/');
  }, [jwt]);

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
          <OAuth42 />
        </>
      )}
    </VStack>
  );
}
