'use client';

import {Button, Stack, StackDivider} from '@chakra-ui/react';
import {ChatIcon, ArrowForwardIcon, TriangleUpIcon, AtSignIcon} from '@chakra-ui/icons';
import Link from 'next/link';
import {useAppSelector} from '@/lib/redux/hook';
import {isLoginSelector, logout} from '@/lib/redux';
import {useDispatch} from 'react-redux';

export default function Sidebar() {
  const dispatch = useDispatch();
  const isLogin = useAppSelector(isLoginSelector);

  return (
    <Stack
      direction={{base: 'row', lg: 'column'}}
      divider={<StackDivider borderColor="gray.200" />}
      width="100%"
      color="white"
      align="center"
      justifyContent="space-between"
      fontSize={{base: '1.2em', lg: '1.4em'}}
      wrap="wrap">
      {isLogin ? (
        <Button onClick={() => dispatch(logout())}>
          <ArrowForwardIcon color="white" />
          Sign Out
        </Button>
      ) : (
        <Link href="/auth" scroll={false}>
          <ArrowForwardIcon color="white" />
          Sign In / Sign Up
        </Link>
      )}
      <Link href="/" scroll={false}>
        <TriangleUpIcon color="white" />
        Home
      </Link>
      <Link href="/game" scroll={false}>
        <ArrowForwardIcon color="white" />
        Game
      </Link>
      <Link href="/chat" scroll={false}>
        <ChatIcon color="white" />
        Chat
      </Link>
      <Link href="/users" scroll={false}>
        <AtSignIcon color="white" />
        Users
      </Link>
    </Stack>
  );
}
