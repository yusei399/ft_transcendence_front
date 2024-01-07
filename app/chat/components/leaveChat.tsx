'use client';
import React from 'react';
import {useLeaveChatMutation} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import {Button} from '@chakra-ui/react';

type LeaveChatProps = {
  chatId: number;
  leaveCb: (chatId: number) => void;
};

const LeaveChat = ({chatId, leaveCb}: LeaveChatProps) => {
  const [leaveChat, {isLoading}] = useLeaveChatMutation();

  const handleLeaveChat = async () => {
    try {
      leaveCb(chatId);
      const res = await leaveChat([chatId]).unwrap();
    } catch (error) {}
  };

  if (isLoading) return <Loading />;

  return <Button onClick={handleLeaveChat}>Leave Chat</Button>;
};

export default LeaveChat;
