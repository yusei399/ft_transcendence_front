'use client';

import React, {useState} from 'react';
import {FormControl, FormLabel, Input, Button, Flex} from '@chakra-ui/react';
import {useCreateChatMutation} from '@/lib/redux/api';
import {HttpCreateChat} from '@/shared/HttpEndpoints/chat';
import {refreshChat} from '@/lib/redux';

const CreateChat = () => {
  const [createChat, {error}] = useCreateChatMutation();
  const [chatInfo, setChatInfo] = useState<HttpCreateChat.reqTemplate>({
    chatName: '',
    chatAvatar: undefined,
    password: undefined,
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createChat([chatInfo]).unwrap();
      dispatch(refreshChat({chatId: res.chatId, reason: 'join'}));
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  if (error) console.log(error);

  return (
    <form onSubmit={e => handleCreate(e)}>
      <Flex flexDir="column" alignItems="center" gap="10px">
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
            autoComplete="off"
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
        <Button type="submit" size="lg" width="40%">
          Create Chat
        </Button>
      </Flex>
    </form>
  );
};

export default CreateChat;
function dispatch(arg0: {
  payload: {chatId: number; reason: 'join' | 'leave' | 'newMessage'} | undefined;
  type: 'chat/refreshChat';
}) {
  throw new Error('Function not implemented.');
}
