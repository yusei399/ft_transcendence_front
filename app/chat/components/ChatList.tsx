'use client';

import Loading from '@/app/components/global/Loading';
import {useGetAllChatsQuery} from '@/lib/redux/api';
import {CheckCircleIcon, LockIcon} from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  Avatar,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import Chat from './Chat';
import CreateChat from './CreateChat';
import JoinChat from './JoinChat';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {chatToRefreshSelector, clearChatToRefresh} from '@/lib/redux';

type OpenedChat = {
  chatId: number;
  chatName: string;
  hasJoined: boolean;
  hasPassword: boolean;
};

function ChatList() {
  const {data, isLoading, error, isFetching, refetch} = useGetAllChatsQuery([]);
  const [openedChat, setOpenedChat] = useState<OpenedChat | undefined>(undefined);
  const dispatch = useAppDispatch();
  const chatToRefresh = useAppSelector(chatToRefreshSelector);

  useEffect(() => {
    if (chatToRefresh && data) {
      refetch();
      const chat = data.chats.find(c => c.chatId === chatToRefresh.chatId);
      if (chatToRefresh.reason === 'join' && chat) {
        const {chatId, hasPassword, chatName} = chat;
        setOpenedChat({chatId, hasJoined: true, hasPassword, chatName});
      } else setOpenedChat(undefined);
      dispatch(clearChatToRefresh());
    }
  }, [chatToRefresh, data]);

  if (isLoading || isFetching) return <Loading />;
  if (error) console.log(error);
  if (!data) return <CreateChat />;

  function openChat(chat: OpenedChat) {
    if (openedChat === undefined || chat.chatId !== openedChat.chatId) setOpenedChat(chat);
    else setOpenedChat(undefined);
  }

  return (
    <Grid templateColumns="repeat(6, 1fr)" h="80vh">
      <GridItem colSpan={4}>
        {!openedChat && <CreateChat />}
        {openedChat && (
          <VStack>
            <Heading size={'lg'} color="azure">
              {openedChat.chatName}
            </Heading>
            {openedChat.hasJoined ? (
              <Chat chatId={openedChat.chatId} />
            ) : (
              <JoinChat chatId={openedChat.chatId} hasPassword={openedChat.hasPassword} />
            )}
          </VStack>
        )}
      </GridItem>
      <GridItem colSpan={2} overflowY="auto" flex="1" width="100%">
        <VStack spacing={6}>
          {data.chats.map(chat => {
            const {chatId, chatName, chatAvatarUrl, hasPassword, participation} = chat;
            const hasJoined = !!participation;
            return (
              <Card
                key={chatId}
                width={'75%'}
                padding={'10px'}
                onClick={() => openChat({chatId, hasJoined, hasPassword, chatName})}>
                {hasPassword && <LockIcon boxSize={4} pos={'absolute'} left={'10px'} />}
                {hasJoined && <CheckCircleIcon boxSize={4} pos={'absolute'} right={'10px'} />}
                <CardHeader>
                  <Heading size="md">{chatName}</Heading>
                </CardHeader>
                <CardBody alignSelf={'center'}>
                  <Avatar boxSize="60px" src={chatAvatarUrl ?? './assets/sample_chat.png'} />
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
