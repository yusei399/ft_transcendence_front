'use client';

import {Button, Stack, StackDivider} from '@chakra-ui/react';
import {ChatIcon, ArrowForwardIcon, TriangleUpIcon, AtSignIcon} from '@chakra-ui/icons';
import Link from 'next/link';
import {useAppSelector} from '@/lib/redux/hook';
import {isLoginSelector, logout} from '@/lib/redux';
import {useDispatch} from 'react-redux';
import {SocketService} from '@/services/websocket/socketService';

export default function Sidebar() {
  const dispatch = useDispatch();
  const isLogin = useAppSelector(isLoginSelector);
  return (
    <Stack
      direction={{base: 'row', lg: 'column'}}
      divider={<StackDivider borderColor="gray.200" />}
      color="white"
      fontSize={{base: '1em', md: '1.2em'}}
      wrap="wrap"
      spacing={{base: '10', lg: '20px'}}>
      {isLogin ? (
        <Button onClick={() => dispatch(logout())}>
          <ArrowForwardIcon color="white" />
          Sign Out
        </Button>
      ) : (
        <Link href="/auth">
          <ArrowForwardIcon color="white" />
          Sign In / Sign Up
        </Link>
      )}
      <Link href="/">
        <TriangleUpIcon color="white" />
        Home
      </Link>
      <Link href="/game">
        <ArrowForwardIcon color="white" />
        Game
      </Link>
      <Link href="/chat">
        <ChatIcon color="white" />
        Chat
      </Link>
      <Link href="/friend">
        <AtSignIcon color="white" />
        Friend
      </Link>
    </Stack>
  );
}
