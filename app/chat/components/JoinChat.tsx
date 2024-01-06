'use client';
import React, {useState} from 'react';
import {useJoinChatMutation} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import {Button, FormControl, FormLabel, Input} from '@chakra-ui/react';

type JoinChatProps = {
  chatId: number;
  hasPassword: boolean;
};

const JoinChat = ({chatId, hasPassword}: JoinChatProps) => {
  const [joinChat, {isLoading, error}] = useJoinChatMutation();
  const [password, setPassword] = useState<string | undefined>();

  const handleJoinChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = joinChat([chatId, {password}]).unwrap();
    } catch (error) {
      console.error('Error joining chat:', error);
    }
  };
  if (isLoading) return <Loading />;
  if (error) console.log(error);

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
      <Button type="submit" size="lg">
        Join Chat
      </Button>
    </form>
  );
};

export default JoinChat;
