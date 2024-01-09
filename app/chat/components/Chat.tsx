'use client';
import Loading from '@/app/components/global/Loading';
import {chatToRefreshSelector, clearChatToRefresh, setNotification} from '@/lib/redux';
import {useGetChatInfoQuery} from '@/lib/redux/api';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {SocketService} from '@/services/websocket/socketService';
import {Button, FormControl, Input, ListItem, List, Text, HStack, Center} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import LeaveChat from './leaveChat';

const Chat = ({chatId}: {chatId: number}) => {
  const [toSend, setToSend] = useState('');
  const dispatch = useAppDispatch();
  const chatToRefresh = useAppSelector(chatToRefreshSelector);

  const {data, isLoading, refetch} = useGetChatInfoQuery([chatId]);

  useEffect(() => {
    if (!data || chatToRefresh?.reason !== 'newMessage' || chatToRefresh?.chatId !== chatId) return;
    refetch();
    dispatch(clearChatToRefresh());
  }, [chatToRefresh, data]);

  if (isLoading || !data) return <Loading />;

  const participation = data.chatOverview.participation;
  if (!participation) return <Loading />;

  const blockedUntil = new Date(participation.blockedUntil ?? 0).getTime();
  const mutedUntil = new Date(participation.mutedUntil ?? 0).getTime();

  if (blockedUntil > Date.now())
    return (
      <Center>
        You are blocked
        <LeaveChat chatId={chatId} />
      </Center>
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutedUntil > Date.now()) {
      dispatch(
        setNotification({
          title: 'Cannot send message',
          description: 'You are muted',
          status: 'error',
        }),
      );
      return;
    }

    const toSendTrimmed = toSend.trim();
    if (toSendTrimmed) {
      SocketService.emit('sendMessage', {
        chatId: chatId,
        messageContent: toSendTrimmed,
      });
    } else {
      dispatch(
        setNotification({
          title: 'Invalid message',
          description: 'Message cannot be empty',
          status: 'error',
        }),
      );
    }
    setToSend('');
  };

  return (
    <>
      <List spacing={2} overflowY="auto" height="100%">
        {data.chatMessages.map(message => {
          const {messageId, avatarUrl, nickname, senderId, createdAt, messageContent} = message;
          const isSender = senderId === participation.userId;
          return (
            <ListItem
              key={messageId}
              minW="50%"
              w="fit-content"
              maxW="80%"
              borderWidth="1px"
              borderRadius="lg"
              bgColor={isSender ? 'teal' : 'azure'}
              textAlign={isSender ? 'right' : 'left'}
              marginLeft={isSender ? 'auto' : 'initial'}
              overflow="hidden"
              padding="12px">
              <HStack flexDir={isSender ? 'row-reverse' : 'row'}>
                <img
                  src={avatarUrl ?? './assets/sample.png'}
                  alt={`${isSender ? 'your' : `${nickname}'s`} avatar`}
                  style={{width: '30px', height: '30px'}}
                />
                <Text fontWeight={800}>{isSender ? 'You' : nickname}:</Text>
              </HStack>
              <Text>{messageContent}</Text>
              <small>{new Date(createdAt).toLocaleString()}</small>
            </ListItem>
          );
        })}
      </List>
      <form onSubmit={e => handleSubmit(e)}>
        <HStack>
          <FormControl isRequired>
            <Input
              type="text"
              name="chat_message"
              value={toSend}
              onChange={e => setToSend(e.target.value)}
              autoFocus={true}
            />
          </FormControl>
          <Button type="submit" isDisabled={!toSend}>
            送信
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default Chat;
