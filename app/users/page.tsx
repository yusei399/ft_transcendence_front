'use client';
import InvitationsList from '../components/invitation/Invitation';
import UsersList from './components/UsersList';
import {HStack, StackDivider, VStack} from '@chakra-ui/react';

export default function IndexPage(): JSX.Element {
  return (
    <HStack
      justifyContent="space-between"
      width="100%"
      align="flex-start"
      divider={<StackDivider borderColor="gray.400" />}>
      <HStack as="section" spacing="12px">
        <UsersList filter="withoutFriends" invitationButton="friend" />
      </HStack>
      <HStack as="section" spacing="12px">
        <VStack>
          <UsersList filter="friendsOnly" removeFriendButton={true} />
          <InvitationsList kind_url="friend" />
        </VStack>
      </HStack>
    </HStack>
  );
}
