import {Flex, Heading} from '@chakra-ui/react';
import ChatList from './components/ChatList';
import CreateChat from './components/CreateChat';
import InvitationsList from '../components/invitation/Invitation';

export default function IndexPage() {
  return (
    <Flex justifyContent="space-around" width="100%" height="100%">
      <Flex
        flexFlow="wrap"
        gap="6px"
        height="fit-content"
        maxHeight="100%"
        alignSelf="center"
        overflowY="auto"
        width="40%">
        <ChatList />
      </Flex>
      <Flex
        alignItems="center"
        alignSelf="center"
        height="100%"
        width="55%"
        gap="12px"
        flexDir="column"
        overflowY="auto">
        <CreateChat />
        <InvitationsList kind_url="chat" />
      </Flex>
    </Flex>
  );
}
