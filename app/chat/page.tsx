import {Flex} from '@chakra-ui/react';
import ChatList from './components/ChatList';
import CreateChat from './components/CreateChat';

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
      <Flex alignItems="center" justifyContent="center" height="100%" width="55%">
        <CreateChat />
      </Flex>
    </Flex>
  );
}
