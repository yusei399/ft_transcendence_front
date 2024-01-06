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
import LeaveChat from './leaveChat';
import JoinChat from './JoinChat';
import {useState} from 'react';
import Chat from './Chat';
import CreateChat from './CreateChat';

function ChatList() {
  const {data, isLoading, error, isFetching} = useGetAllChatsQuery([]);
  const userId = useAppSelector(userIdSelector);
  const [openedChatId, setOpenedChatId] = useState<number | undefined>(undefined);

  if (isLoading || isFetching) return <Loading />;
  if (error) console.log(error);
  if (!data) return <CreateChat />;

  function openChat(chatId: number, hasJoined: boolean) {
    if (openedChatId === chatId) setOpenedChatId(undefined);
    else if (hasJoined) setOpenedChatId(chatId);
  }

  function getOutLeavedChat(chatId: number) {
    if (openedChatId === chatId) setOpenedChatId(undefined);
  }

  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem colSpan={4} height={{lg: '100vh'}}>
        {openedChatId ? <Chat chatId={openedChatId} /> : <CreateChat />}
      </GridItem>
      <GridItem colSpan={2} minHeight={{lg: '100vh'}}>
        <VStack spacing="8px">
          {data.chats.map(chat => {
            const {chatId, name, chatAvatarUrl, hasPassword, participants} = chat;
            const nbParticipants = participants.length;
            const hasJoined = participants.some(
              p => p.userProfile.userId === userId && !p.hasLeaved,
            );
            return (
              <Card key={chatId} onClick={() => openChat(chatId, hasJoined)}>
                <CardHeader>
                  <Heading size="md">
                    {hasPassword && <LockIcon boxSize={6} />}
                    {name}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Avatar boxSize="100px" src={chatAvatarUrl ?? './assets/sample_chat.png'} />
                  <Text>{`${nbParticipants} participant${nbParticipants > 1 ? 's' : ''}`}</Text>
                  {hasJoined ? (
                    <LeaveChat chatId={chatId} leaveCb={getOutLeavedChat} />
                  ) : (
                    <JoinChat chatId={chatId} hasPassword={hasPassword} />
                  )}
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
