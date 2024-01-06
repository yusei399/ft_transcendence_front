'use client';
import Loading from '@/app/components/global/Loading';
import {setNotification} from '@/lib/redux';
import {useGetChatMessagesQuery} from '@/lib/redux/api';
import {useAppDispatch} from '@/lib/redux/hook';
import {SocketService} from '@/services/websocket/socketService';
import {Button, FormControl, Input} from '@chakra-ui/react';
import React, {useState} from 'react';

const Chat = ({chatId}: {chatId: number}) => {
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const {data, isLoading, refetch} = useGetChatMessagesQuery([chatId]);

  if (isLoading) return <Loading />;
  if (!data) return <div>no data</div>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <section>
      {data.messages.map(message => {
        const participant = data.participants.find(
          participant => participant.userProfile.userId === message.userId,
        );
        if (!participant) return <></>;
        const {nickname, avatarUrl, userId} = participant.userProfile;
        const {blockedUntil, mutedUntil, hasLeaved} = participant;
        const {messageId, messageContent, createdAt} = message;
        return (
          <div key={messageId}>
            <img
              src={avatarUrl ?? './assets/sample.png'}
              alt={nickname}
              style={{width: '30px', height: '30px'}}
            />
            <strong>{nickname}</strong>
            <p>{message.messageContent}</p>
            <p>sent at: {message.createdAt.toLocaleString()}</p>
          </div>
        );
      })}
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
    </section>
  );
};

export default Chat;
