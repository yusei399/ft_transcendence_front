'use client';
import Invitation from '../components/Invitation';
import FriendList from './components/FriendList';
import {Box, HStack, Heading, StackDivider} from '@chakra-ui/react';

export default function IndexPage() {
  return (
    <HStack
      align="center"
      justifyContent="space-between"
      divider={<StackDivider borderColor="gray.400" />}>
      <Box as="section">
        <Heading size="md">ユーザー一覧</Heading>
        <FriendList />
      </Box>

      <Box as="section">
        <Heading size="md">招待</Heading>
        <Invitation kind="friend" />
      </Box>
    </HStack>
  );
}
