'use client';
import React from 'react';
import {useLeaveChatMutation} from '@/lib/redux/api';
import {Button} from '@chakra-ui/react';
import {useAppDispatch} from '@/lib/redux/hook';
import {refreshChat} from '@/lib/redux';

type LeaveChatProps = {
  chatId: number;
};

const LeaveChat = ({chatId}: LeaveChatProps) => {
  const [leaveChat] = useLeaveChatMutation();
  const dispatch = useAppDispatch();

  const handleLeaveChat = async () => {
    try {
      await leaveChat([chatId]).unwrap();
      dispatch(refreshChat({chatId, reason: 'leave'}));
    } catch (error) {
      console.error('Error leaving chat:', error);
    }
  };

  return (
    <Button onClick={handleLeaveChat} size="lg" colorScheme={'red'}>
      Leave Chat
    </Button>
  );
};

export default LeaveChat;
