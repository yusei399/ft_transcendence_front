'use client';
import React, {useState} from 'react';
import {HttpJoinChat} from '@/shared/HttpEndpoints/chat';
import {useAppSelector} from '@/lib/redux/hook';
import {jwtSelector} from '@/lib/redux';
import {useJoinChatMutation} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';

const JoinChat = ({chatId}: {chatId: number}) => {
  const authToken = useAppSelector(jwtSelector) ?? '';
  const [joinChat, {isLoading, error}] = useJoinChatMutation();
  const [chatInfo, setChatInfo] = useState<HttpJoinChat.reqTemplate>({
    password: undefined,
  });

  const handleJoinChat = async () => {
    try {
      const res = joinChat([chatId, chatInfo, authToken]).unwrap();
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
