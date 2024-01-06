'use client';
import Loading from '@/app/components/global/Loading';
import {setNotification, userIdSelector} from '@/lib/redux';
import {useGetChatMessagesQuery} from '@/lib/redux/api';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
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
import JoinChat from './JoinChat';
import LeaveChat from './leaveChat';

export type OpenedChat = {
  chatId: number;
  hasJoined: boolean;
  hasPassword: boolean;
};

const Chat = ({chat: {chatId, hasJoined, hasPassword}}: {chat: OpenedChat}) => {
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const {data, isLoading, isFetching, refetch, isError} = useGetChatMessagesQuery([chatId], {
    skip: !hasJoined,
  });
  const current_userId = useAppSelector(userIdSelector);

  if (isLoading || isFetching) return <Loading />;
  if (!data) return <div>no data</div>;

  if (!hasJoined || isError)
    return (
      <Center h="80vh">
        <JoinChat chatId={chatId} hasPassword={hasPassword} />
      </Center>
    );

  const current_participant = data.participants.find(p => p.userProfile.userId === current_userId);
  if (!current_participant || current_participant.hasLeaved) return <Loading />;

  const blockedUntil = new Date(current_participant.blockedUntil ?? 0).getTime();
  const mutedUntil = new Date(current_participant.mutedUntil ?? 0).getTime();

  if (blockedUntil > Date.now()) return <div>you are blocked</div>;

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

    const toSend = message.trim();
    if (toSend) {
      SocketService.emit('sendMessage', {
        chatId: chatId,
        messageContent: toSend,
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
    setMessage('');
  };

  return (
    <VStack h="80vh">
      <LeaveChat chatId={chatId} />
      <List spacing={6} overflowY="auto" flex="1" width="100%">
        {data.messages.map(message => {
          const participant = data.participants.find(
            participant => participant.userProfile.userId === message.userId,
          );
          if (!participant) return <></>;
          const {nickname, avatarUrl, userId} = participant.userProfile;
          const {messageId, messageContent, createdAt} = message;
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
                <small>{new Date(message.createdAt).toLocaleString()}</small>
              </HStack>
              <Text>{message.messageContent}</Text>
            </ListItem>
          );
        })}
      </List>
      <form onSubmit={e => handleSubmit(e)}>
        <FormControl isRequired>
          <Input
            type="text"
            name="chat_message"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </FormControl>
        <Button type="submit" isDisabled={!message} style={{margin: '20px'}}>
          送信
        </Button>
      </form>
    </VStack>
  );
};

export default Chat;
