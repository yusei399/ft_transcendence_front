'use client';
import InvitationsList from '../components/invitation/Invitation';
import UsersList from '../components/global/UsersList';
import {HStack, Heading, StackDivider, VStack} from '@chakra-ui/react';

export default function IndexPage() {
  return (
    <HStack
      justifyContent="space-between"
      width="100%"
      align="stretch"
      divider={<StackDivider borderColor="gray.400" />}>
      <VStack as="section" alignItems="center" spacing="12px" flex="3">
        <UsersList filter="friendsOnly" removeFriendButton={true} />
        <UsersList filter="withoutFriends" invitationButton="friend" />
      </VStack>
      <VStack as="section" alignItems="center" spacing="12px" flex="1">
        <InvitationsList kind_url="friend" />
      </VStack>
    </HStack>
  );
}
