'use client';

import React, {useState} from 'react';
import {FormControl, FormLabel, Input, Button, Flex, Switch} from '@chakra-ui/react';
import {ErrorType, useCreateChatMutation} from '@/lib/redux/api';
import {HttpCreateChat} from '@/shared/HttpEndpoints/chat';
import {useRouter} from 'next/navigation';
import {useAppDispatch, setNotification} from '@/lib/redux';

const CreateChat = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createChat] = useCreateChatMutation();
  const [chatInfo, setChatInfo] = useState<HttpCreateChat.reqTemplate>({
    chatName: '',
    chatAvatar: undefined,
    password: undefined,
    isPrivate: false,
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const req = {...chatInfo, password: chatInfo.isPrivate ? undefined : chatInfo.password};
      const res = await createChat([req]).unwrap();
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
          <FormLabel>
            Chat Name:{chatInfo.chatName && chatInfo.chatName.length < 3 && ' 3 characters min'}
            {chatInfo.chatName && chatInfo.chatName.length > 20 && ' 20 characters max'}
          </FormLabel>
          <Input
            type="text"
            minLength={3}
            maxLength={20}
            value={chatInfo.chatName}
            onChange={e => setChatInfo({...chatInfo, chatName: e.target.value})}
          />
        </FormControl>
        <Flex flexFlow="row" gap="12px" width="100%">
          <FormControl>
            <FormLabel>
              Password:
              {chatInfo.password && chatInfo.password.length < 3 && ' 3 characters min'}
            </FormLabel>
            <Input
              isDisabled={chatInfo.isPrivate}
              type="password"
              autoComplete="off"
              minLength={3}
              value={chatInfo.password ?? ''}
              onChange={e => setChatInfo({...chatInfo, password: e.target.value})}
            />
          </FormControl>
          <FormControl display="flex" alignItems="flex-end" marginBottom="12px">
            <FormLabel mb="0" textColor={chatInfo.isPrivate ? 'red.400' : 'blue.400'}>
              {chatInfo.isPrivate ? 'Private' : 'Public'}
            </FormLabel>
            <Switch
              colorScheme={chatInfo.isPrivate ? 'red' : 'green'}
              defaultChecked={false}
              onChange={e => setChatInfo({...chatInfo, isPrivate: e.target.checked})}
            />
          </FormControl>
        </Flex>
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
