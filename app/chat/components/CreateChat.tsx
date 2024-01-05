'use client';

import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useCreateChatMutation } from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';

const CreateChat = () => {
  const [createChat, { isLoading, error }] = useCreateChatMutation();
  const [chatInfo, setChatInfo] = useState({
    name: '',
    chatAvatar: undefined,
    password: undefined,
  });

  const handleCreate = async () => {
    try {
      // Prepare the form data for file upload
      const formData = new FormData();
      formData.append('name', chatInfo.name);
      if (chatInfo.chatAvatar) {
        formData.append('chatAvatar', chatInfo.chatAvatar);
      }
      formData.append('password', chatInfo.password || '');
      const res = await createChat([formData]).unwrap();
      console.log(res);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) console.log(error);

  return (
    <div>
      <FormControl isRequired>
        <FormLabel>Chat Name:</FormLabel>
        <Input
          type="text"
          value={chatInfo.name}
          onChange={e => setChatInfo({ ...chatInfo, name: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Avatar:</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={e => setChatInfo({ ...chatInfo, chatAvatar: e.target.files?.[0] })}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password:</FormLabel>
        <Input
          type="password"
          value={chatInfo.password}
          onChange={e => setChatInfo({ ...chatInfo, password: e.target.value })}
        />
      </FormControl>
      <Button onClick={handleCreate}>Create Chat</Button>
    </div>
  );
};

export default CreateChat;


