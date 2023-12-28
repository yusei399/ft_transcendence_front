'use client';
import React, {useState} from 'react';
import {useJoinChatMutation} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import {HttpJoinChat} from '@/shared/HttpEndpoints/chat';

const JoinChat = ({chatId}: {chatId: number}) => {
  const [joinChat, {isLoading, error}] = useJoinChatMutation();
  const [chatInfo, setChatInfo] = useState<HttpJoinChat.reqTemplate>({
    password: undefined,
  });

  const handleJoinChat = async () => {
    try {
      const res = joinChat([chatId, chatInfo]).unwrap();
      console.log(res);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };
  if (isLoading) return <Loading />;
  if (error) console.log(error);

  return (
    <div>
      <h1>Join Chat</h1>
      <input
        type="password"
        placeholder="Password"
        value={chatInfo.password}
        onChange={e => setChatInfo({...chatInfo, password: e.target.value})}
      />
      <button onClick={handleJoinChat}>Join Chat</button>
    </div>
  );
};

export default JoinChat;
