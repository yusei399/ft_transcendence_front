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
  HStack,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import Chat from './Chat';
import CreateChat from './CreateChat';
import JoinChat from './JoinChat';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {chatToRefreshSelector, clearChatToRefresh} from '@/lib/redux';
import LeaveChat from './leaveChat';

type OpenedChat = {
  chatId: number;
  chatName: string;
  chatAvatarUrl?: string;
  hasJoined: boolean;
  hasPassword: boolean;
};

function ChatList() {
  const {data, isLoading, error} = useGetAllChatsQuery([]);
  const [openedChat, setOpenedChat] = useState<OpenedChat | undefined>(undefined);
  const dispatch = useAppDispatch();
  const chatToRefresh = useAppSelector(chatToRefreshSelector);

  useEffect(() => {
    if (!chatToRefresh || !data) return;

    const chat = data.chats.find(c => c.chatId === chatToRefresh.chatId);
    if (!chat || chatToRefresh.reason == 'leave') setOpenedChat(undefined);
    else if (chatToRefresh.reason === 'join') {
      const {chatId, hasPassword, chatName} = chat;
      setOpenedChat({chatId, hasJoined: true, hasPassword, chatName});
    }

    dispatch(clearChatToRefresh());
  }, [chatToRefresh, data]);

  if (isLoading) return <Loading />;
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
            <HStack justifyContent="space-between">
              <Avatar
                size="md"
                name={openedChat.chatName}
                src={openedChat.chatAvatarUrl ?? './assets/sample_chat.png'}
              />
              <Heading>{openedChat.chatName}</Heading>
              {openedChat.hasJoined ? (
                <LeaveChat chatId={openedChat.chatId} />
              ) : (
                <JoinChat chatId={openedChat.chatId} hasPassword={openedChat.hasPassword} />
              )}
            </HStack>
            {openedChat.hasJoined && <Chat chatId={openedChat.chatId} />}
          </VStack>
        )}
      </GridItem>
      <GridItem colSpan={2} overflowY="auto" flex="1" width="100%">
        <VStack spacing={2}>
          {data.chats.map(chat => {
            const {chatId, chatName, chatAvatarUrl, hasPassword, participation} = chat;
            const hasJoined = !!participation;
            const isOpened = openedChat?.chatId === chatId;
            return (
              <Card
                key={chatId}
                bg={isOpened ? 'blue.500' : undefined}
                width={'75%'}
                padding={'6px'}
                onClick={() => openChat({chatId, hasJoined, hasPassword, chatName})}>
                <CardHeader paddingBottom={0}>
                  <HStack justifyContent={'space-between'}>
                    {hasPassword ? <LockIcon boxSize={4} /> : <div></div>}
                    <Heading size="md" wordBreak={'break-word'}>
                      {chatName}
                    </Heading>
                    {hasJoined ? <CheckCircleIcon boxSize={4} /> : <div></div>}
                  </HStack>
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
