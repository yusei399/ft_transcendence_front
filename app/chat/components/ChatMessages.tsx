import React from 'react';
import {useGetChatMessagesQuery} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';

const ChatMessages = ({chatId}: {chatId: number}) => {
  const {data, isLoading, error} = useGetChatMessagesQuery([chatId]);

  if (isLoading) return <Loading />;
  if (!data) return <div>no data</div>;
  if (error) return console.log(error);

  return (
    <div>
      <h2>Messages in Chat {chatId}</h2>
      <ul>
        {data.messages.map(message => (
          <li key={message.messageId}>
            <strong>{message.userId}</strong>: {message.messageContent}
            <br />
            <small>Sent at: {new Date(message.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
