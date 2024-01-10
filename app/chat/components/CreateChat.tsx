'use client';

import React, {useState} from 'react';
import {FormControl, FormLabel, Input, Button, Flex} from '@chakra-ui/react';
import {ErrorType, useCreateChatMutation} from '@/lib/redux/api';
import {HttpCreateChat} from '@/shared/HttpEndpoints/chat';
import {useRouter} from 'next/navigation';
import {useAppDispatch} from '@/lib/redux/hook';
import {setNotification} from '@/lib/redux';

const CreateChat = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createChat] = useCreateChatMutation();
  const [chatInfo, setChatInfo] = useState<HttpCreateChat.reqTemplate>({
    chatName: '',
    chatAvatar: undefined,
    password: undefined,
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createChat([chatInfo]).unwrap();
      setChatInfo({chatName: '', chatAvatar: undefined, password: undefined});
      router.push(`/chat/${res.chatId}`);
    } catch (error) {
      const message =
        (error as ErrorType).status === 409 ? 'Chat name already taken' : 'Something went wrong';
      dispatch(
        setNotification({status: 'error', title: 'Chat creation error', description: message}),
      );
    }
  };

  return (
    <form onSubmit={e => handleCreate(e)}>
      <Flex flexDir="column" alignItems="center" gap="10px">
        <FormControl isRequired>
          <FormLabel>Chat Name:</FormLabel>
          <Input
            type="text"
            minLength={3}
            maxLength={20}
            value={chatInfo.chatName}
            onChange={e => setChatInfo({...chatInfo, chatName: e.target.value})}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            autoComplete="off"
            minLength={3}
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
