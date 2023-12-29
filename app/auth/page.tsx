'use client';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {Divider, HStack, Heading, VStack} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import Auth2FA from './components/Auth2FA';
import {is2FANeededSelector} from '@/lib/redux';
import OAuth42 from './components/OAuth42';

export default function IndexPage() {
  const is2FA = useSelector(is2FANeededSelector);

  return (
    <VStack spacing="48px">
      <Heading as="h1">Auth</Heading>
      {is2FA ? (
        <Auth2FA />
      ) : (
        <>
          <HStack spacing="24px">
            <SignIn />
            <Divider orientation="vertical" height={300} />
            <SignUp />
          </HStack>
          <OAuth42 />
        </>
      )}
    </VStack>
  );
}
