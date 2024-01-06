'use client';

import Loading from '@/app/components/global/Loading';
import {userIdSelector} from '@/lib/redux';
import {useGetAllChatsQuery} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hook';
import {LockIcon} from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  Avatar,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import {useState} from 'react';
import Chat, {OpenedChat} from './Chat';
import CreateChat from './CreateChat';

function ChatList() {
  const {data, isLoading, error, isFetching} = useGetAllChatsQuery([]);
  const userId = useAppSelector(userIdSelector);
  const [openedChat, setOpenedChat] = useState<OpenedChat | undefined>(undefined);

  if (isLoading || isFetching) return <Loading />;
  if (error) console.log(error);
  if (!data) return <CreateChat />;

  function openChat(chat: OpenedChat) {
    if (openedChat === undefined || openedChat.chatId !== chat.chatId) setOpenedChat(chat);
    else setOpenedChat(undefined);
  }

  return (
    <Grid templateColumns="repeat(6, 1fr)" h="80vh">
      <GridItem colSpan={4}>{openedChat ? <Chat chat={openedChat} /> : <CreateChat />}</GridItem>
      <GridItem colSpan={2} overflowY="auto" flex="1" width="100%">
        <VStack spacing={6}>
          {data.chats.map(chat => {
            const {chatId, name, chatAvatarUrl, hasPassword, participants} = chat;
            const nbParticipants = participants.reduce(
              (acc, p) => (p.hasLeaved ? acc : acc + 1),
              0,
            );
            const hasJoined = participants.some(
              p => p.userProfile.userId === userId && !p.hasLeaved,
            );
            return (
              <Card key={chatId} onClick={() => openChat({chatId, hasJoined, hasPassword})}>
                <CardHeader>
                  <Heading size="md">
                    {hasPassword && <LockIcon boxSize={6} />}
                    {name}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Avatar boxSize="60px" src={chatAvatarUrl ?? './assets/sample_chat.png'} />
                  <Text>{`${nbParticipants} participant${nbParticipants > 1 ? 's' : ''}`}</Text>
                </CardBody>
              </Card>
            );
          })}
        </VStack>
      </GridItem>
    </Grid>
  );
}
export default ChatList;
