'use client';
import Invitation from '../components/Invitation';
import FriendList from './components/FriendList';
import {HStack, Heading, StackDivider, VStack} from '@chakra-ui/react';

export default function IndexPage() {
  return (
    <HStack
      justifyContent="space-between"
      align="stretch"
      divider={<StackDivider borderColor="gray.400" />}>
      <VStack as="section" alignItems="center" spacing="12px" flex="3">
        <Heading size="lg">ユーザー一覧</Heading>
        <FriendList />
      </VStack>
      <VStack as="section" alignItems="center" spacing="12px" flex="1">
        <Heading size="lg">招待</Heading>
        <Invitation kind="friend" />
      </VStack>
    </HStack>
  );
}
