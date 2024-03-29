'use client';
import React, {useState} from 'react';
import {useJoinChatMutation, type ErrorType} from '@/lib/redux/api';
import {Button, Flex, FormControl, FormLabel, Input} from '@chakra-ui/react';
import {useAppDispatch, setNotification} from '@/lib/redux';

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
      await joinChat([chatId, {password}]).unwrap();
    } catch (err) {
      let message = 'Error at joining chat';
      if ((err as ErrorType).status === 403) message = 'Wrong password';

      dispatch(setNotification({status: 'error', title: 'Error', description: message}));
    }
  };

  return (
    <form onSubmit={e => handleJoinChat(e)}>
      <Flex align="end" gap="5px">
        {hasPassword && (
          <FormControl isRequired={hasPassword} maxW="50%">
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              name="password"
              autoComplete="off"
              value={password ?? ''}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
        )}
        <Button type="submit" size="lg" colorScheme="teal">
          Join Chat
        </Button>
      </Flex>
    </form>
  );
};

export default JoinChat;
