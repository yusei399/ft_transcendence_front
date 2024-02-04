'use client';

import {Button, Stack, StackDivider} from '@chakra-ui/react';
import {ChatIcon, ArrowForwardIcon, TriangleUpIcon, AtSignIcon} from '@chakra-ui/icons';
import Link from 'next/link';
import {useAppDispatch} from '@/lib/redux';
import {resetSlicesAndLogout} from '../auth/components/logUser';

export default function Sidebar() {
  const dispatch = useAppDispatch();

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
      <Button onClick={() => resetSlicesAndLogout(dispatch)}>
        <ArrowForwardIcon color="white" />
        Sign Out
      </Button>
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
