'use client';
import React from 'react';
import {useLeaveChatMutation} from '@/lib/redux/api';
import {Button} from '@chakra-ui/react';

const LeaveChat = ({chatId}: {chatId: number}): JSX.Element => {
  const [leaveChat] = useLeaveChatMutation();

  const handleLeaveChat = async (): Promise<void> => {
    try {
      await leaveChat([chatId]).unwrap();
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
