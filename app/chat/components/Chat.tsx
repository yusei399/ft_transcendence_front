'use client';
import Loading from '@/app/components/global/Loading';
import {useGetChatMessagesQuery} from '@/lib/redux/api';
import {SocketService} from '@/services/websocket/socketService';
import React, {useState} from 'react';

const Chat = ({chatId}: {chatId: number}) => {
  const [message, setMessage] = useState('');
  const {data, isLoading, error} = useGetChatMessagesQuery([chatId]);

  if (isLoading) return <Loading />;
  if (!data) return <div>no data</div>;

  const handleSubmit = () => {
    const toSend = message.trim();
    if (toSend) {
      SocketService.emit('sendMessage', {
        chatId: chatId,
        messageContent: toSend,
      });
    } else {
      console.log('No message to submit');
    }
  };

  return (
    <div>
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
      <input
        type="text"
        className="chat_message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit} style={{margin: '20px'}}>
        送信
      </button>
    </div>
  );
};

export default Chat;
