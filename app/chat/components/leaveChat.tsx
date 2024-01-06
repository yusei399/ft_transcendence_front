'use client';
import React from 'react';
import {useLeaveChatMutation} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import {Button} from '@chakra-ui/react';

type LeaveChatProps = {
  chatId: number;
};

const LeaveChat = ({chatId}: LeaveChatProps) => {
  const [leaveChat, {isLoading, error}] = useLeaveChatMutation();

  const handleLeaveChat = async () => {
    try {
      const res = await leaveChat([chatId]).unwrap();
    } catch (error) {
      console.error('Error leaving chat:', error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) console.log(error);

  return <Button onClick={handleLeaveChat}>Leave Chat</Button>;
};

export default LeaveChat;
