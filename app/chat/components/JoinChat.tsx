'use client';
import React, {useState} from 'react';
import {useJoinChatMutation} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import {Button, FormControl, FormLabel, Input} from '@chakra-ui/react';
import {useAppDispatch} from '@/lib/redux/hook';
import {refreshChat} from '@/lib/redux';

type JoinChatProps = {
  chatId: number;
  hasPassword: boolean;
};

const JoinChat = ({chatId, hasPassword}: JoinChatProps) => {
  const [joinChat] = useJoinChatMutation();
  const [password, setPassword] = useState<string | undefined>();
  const dispatch = useAppDispatch();

  const handleJoinChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      joinChat([chatId, {password}]).unwrap();
      dispatch(refreshChat({chatId, reason: 'join'}));
    } catch (error) {
      console.error('Error joining chat:', error);
    }
  };

  return (
    <form onSubmit={e => handleJoinChat(e)}>
      {hasPassword && (
        <FormControl isRequired={hasPassword}>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            name="password"
            value={password ?? ''}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
      )}
      <Button type="submit" size="lg" colorScheme="teal">
        Join Chat
      </Button>
    </form>
  );
};

export default JoinChat;
