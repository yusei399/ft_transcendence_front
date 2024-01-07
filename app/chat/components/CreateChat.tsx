'use client';

import React, {useState} from 'react';
import {FormControl, FormLabel, Input, Button} from '@chakra-ui/react';
import {useCreateChatMutation} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import {HttpCreateChat} from '@/shared/HttpEndpoints/chat';

const CreateChat = () => {
  const [createChat, {isLoading, error}] = useCreateChatMutation();
  const [chatInfo, setChatInfo] = useState<HttpCreateChat.reqTemplate>({
    chatName: '',
    chatAvatar: undefined,
    password: undefined,
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createChat([chatInfo]).unwrap();
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) console.log(error);

  return (
    <form onSubmit={e => handleCreate(e)}>
      <FormControl isRequired>
        <FormLabel>Chat Name:</FormLabel>
        <Input
          type="text"
          value={chatInfo.chatName}
          onChange={e => setChatInfo({...chatInfo, chatName: e.target.value})}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password:</FormLabel>
        <Input
          type="password"
          value={chatInfo.password ?? ''}
          onChange={e => setChatInfo({...chatInfo, password: e.target.value})}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Avatar:</FormLabel>
        <Input
          type="file"
          accept="image/*"
          max={1}
          onChange={e => setChatInfo({...chatInfo, chatAvatar: e.target.files?.[0]})}
        />
      </FormControl>
      <Button type="submit">Create Chat</Button>
    </form>
  );
};

export default CreateChat;
