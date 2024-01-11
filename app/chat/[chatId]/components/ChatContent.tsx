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
  HStack,
  Center,
  Avatar,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import LeaveChat from './leaveChat';

const ChatContent = ({chatId}: {chatId: number}) => {
  const [toSend, setToSend] = useState('');
  const dispatch = useAppDispatch();

  const {data, isLoading} = useGetChatInfoQuery([chatId]);

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
              borderWidth="2px"
              borderRadius="lg"
              borderColor={isSender ? 'azure' : 'black'}
              bgColor={isSender ? 'teal' : 'azure'}
              textAlign={isSender ? 'right' : 'left'}
              marginLeft={isSender ? 'auto' : 'initial'}
              overflow="hidden"
              padding="12px">
              <HStack flexDir={isSender ? 'row-reverse' : 'row'}>
                <Avatar src={avatarUrl ?? '/assets/sample.png'} width="40px" height="40px" />
                <Text fontSize="lg" fontWeight={800}>
                  {isSender ? 'You' : nickname}:
                </Text>
              </HStack>
              <Text fontSize="lg" padding={isSender ? '0 8px 0 0' : '0 0 0 8px'}>
                {messageContent}
              </Text>
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

export default ChatContent;
