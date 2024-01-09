'use client';

import Loading from '@/app/components/global/Loading';
import {useGetAllChatsQuery} from '@/lib/redux/api';
import {CheckCircleIcon, LockIcon} from '@chakra-ui/icons';
import {Card, CardBody, CardHeader, Heading, Avatar, HStack, Flex} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import Chat from './Chat';
import CreateChat from './CreateChat';
import JoinChat from './JoinChat';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {chatToRefreshSelector, clearChatToRefresh} from '@/lib/redux';
import LeaveChat from './leaveChat';
import UpdateChat from './updateChat';

type OpenedChat = {
  chatId: number;
  chatName: string;
  chatAvatarUrl?: string;
  hasJoined: boolean;
  hasPassword: boolean;
  isAdmin: boolean;
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
      const {chatId, hasPassword, chatName, participation} = chat;
      setOpenedChat({
        chatId,
        hasJoined: true,
        hasPassword,
        chatName,
        isAdmin: participation?.role === 'ADMIN',
      });
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
    <Flex justifyContent="space-around" width="100%">
      <Flex flexFlow="wrap" gap="6px" height="100%" overflowY="auto" width="40%">
        {data.chats.map(chat => {
          const {chatId, chatName, chatAvatarUrl, hasPassword, participation} = chat;
          const hasJoined = !!participation;
          const isOpened = openedChat?.chatId === chatId;
          return (
            <Card
              key={chatId}
              bg={isOpened ? 'teal.300' : 'gray.100'}
              w="160px"
              overflow="hidden"
              padding={'6px'}
              onClick={() =>
                openChat({
                  chatId,
                  hasJoined,
                  hasPassword,
                  chatName,
                  isAdmin: participation?.role === 'ADMIN',
                })
              }>
              <CardHeader paddingBottom={0}>
                <HStack justifyContent={'space-between'}>
                  <LockIcon color={hasPassword ? 'red.500' : 'gray.500'} />
                  <Heading size="md" wordBreak={'break-word'}>
                    {chatName}
                  </Heading>
                  <CheckCircleIcon color={hasJoined ? 'green.500' : 'gray.500'} />
                </HStack>
              </CardHeader>
              <CardBody alignSelf={'center'}>
                <Avatar boxSize="60px" src={chatAvatarUrl ?? './assets/sample_chat.png'} />
              </CardBody>
            </Card>
          );
        })}
      </Flex>
      {!openedChat ? (
        <Flex alignItems="center" justifyContent="center" height="100%" width="55%">
          <CreateChat />
        </Flex>
      ) : (
        <Flex flexDir="column" gap="20px" height="100%" width="55%">
          <Flex gap="20px" justifyContent="center" alignItems="center">
            {openedChat.hasJoined && (
              <UpdateChat chatId={openedChat.chatId} isAdmin={openedChat.isAdmin} />
            )}
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
          </Flex>
          {openedChat.hasJoined && <Chat chatId={openedChat.chatId} />}
        </Flex>
      )}
    </Flex>
  );
}
export default ChatList;
