'use client';
import InvitationsList from '../components/invitation/Invitation';
import UsersList from './components/UsersList';
import {Box, Flex, HStack, StackDivider} from '@chakra-ui/react';

export default function IndexPage() {
  return (
    <HStack
      justifyContent="space-around"
      width="100%"
      height="100%"
      align="flex-start"
      divider={<StackDivider borderColor="gray.400" />}>
      <Box as="section" overflowY="auto" height="100%">
        <UsersList filter="withoutFriends" invitationButton="friend" />
      </Box>
      <Box as="section" flexDir="column" overflowY="auto" height="100%">
        <UsersList filter="friendsOnly" removeFriendButton={true} />
        <InvitationsList kind_url="friend" />
      </Box>
    </HStack>
  );
}
