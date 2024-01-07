'use client';
import Loading from '@/app/components/global/Loading';
import {setNotification} from '@/lib/redux';
import {useGetChatInfoQuery} from '@/lib/redux/api';
import {useAppDispatch} from '@/lib/redux/hook';
import {SocketService} from '@/services/websocket/socketService';
import {
  Button,
  FormControl,
  Input,
  ListItem,
  List,
  Text,
  VStack,
  HStack,
  Center,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import LeaveChat from './leaveChat';

const Chat = ({chatId}: {chatId: number}) => {
  const [toSend, setToSend] = useState('');
  const dispatch = useAppDispatch();
  const {data, isLoading, refetch} = useGetChatInfoQuery([chatId]);

  if (isLoading) return <Loading />;
  if (!data) return <div>no data</div>;

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
      setTimeout(() => refetch(), 200);
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
    <VStack h="75vh">
      <LeaveChat chatId={chatId} />
      <List spacing={6} overflowY="auto" flex="1" width="100%">
        {data.chatMessages.map(message => {
          const {messageId, avatarUrl, nickname, senderId, createdAt, messageContent} = message;
          return (
            <ListItem
              key={messageId}
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              bgColor="ivory"
              overflow="hidden"
              padding="10px">
              <HStack>
                <img
                  src={avatarUrl ?? './assets/sample.png'}
                  alt={nickname}
                  style={{width: '30px', height: '30px'}}
                />
                <Text fontWeight={800}>{nickname}:</Text>
                <small>{new Date(createdAt).toLocaleString()}</small>
              </HStack>
              <Text>{messageContent}</Text>
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
            />
          </FormControl>
          <Button type="submit" isDisabled={!toSend}>
            送信
          </Button>
        </HStack>
      </form>
    </VStack>
  );
};

export default Chat;
