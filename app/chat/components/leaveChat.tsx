"use client";
import React, { useState }from 'react';
import { useLeaveChatMutation } from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import { HttpLeaveChat } from '@/shared/HttpEndpoints/chat';

const LeaveChat = ({ chatId }: { chatId: number }) => {
  const [leaveChat, { isLoading, error }] = useLeaveChatMutation();
  const [chatInfo, setChatInfo] = useState<HttpLeaveChat.reqTemplate>({
	chatId: chatId,
  });

  const handleLeaveChat = async () => {
    try {
      const res = await leaveChat([chatId, chatInfo]).unwrap();
      console.log(res);
    } catch (error) {
      console.error('Error leaving chat:', error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) console.log(error);

  return (
    <div>
      <h1>Leave Chat</h1>
      <button onClick={handleLeaveChat}>Leave Chat</button>
    </div>
  );
};

export default LeaveChat;

