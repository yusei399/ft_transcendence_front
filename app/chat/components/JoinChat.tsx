'use client';
import React, {useState} from 'react';
import {useJoinChatMutation} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import {Button, FormControl, FormLabel, Input} from '@chakra-ui/react';

const JoinChat = ({chatId, hasPassword}: {chatId: number; hasPassword: boolean}) => {
  const [joinChat, {isLoading}] = useJoinChatMutation();
  const [password, setPassword] = useState<string | undefined>();

  const handleJoinChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = joinChat([chatId, {password}]).unwrap();
    } catch (error) {}
  };
  if (isLoading) return <Loading />;
  //if (error) console.log(error);

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
      <Button type="submit">Join Chat</Button>
    </form>
  );
};

export default JoinChat;
