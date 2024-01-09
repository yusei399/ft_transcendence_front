'use client';
import React, {useState} from 'react';
import {useUpdateChatMutation, useGetChatInfoQuery} from '@/lib/redux/api';
import {HttpUpdateChat} from '@/shared/HttpEndpoints/chat';
import Loading from '@/app/components/global/Loading';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import {useAppDispatch} from '@/lib/redux/hook';
import {setNotification} from '@/lib/redux';
import {EditIcon} from '@chakra-ui/icons';

const UpdateChat = ({chatId, isAdmin}: {chatId: number; isAdmin: boolean}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const dispatch = useAppDispatch();
  const {data, isLoading: queryLoading, error} = useGetChatInfoQuery([chatId]);
  const [updateChat, {isLoading}] = useUpdateChatMutation();
  const [updateInfo, setUpdateInfo] = useState<HttpUpdateChat.reqTemplate>({
    chatName: undefined,
    password: undefined,
    chatAvatar: undefined,
  });

  if (queryLoading || isLoading) return <Loading />;
  if (error) console.log(error);
  if (!data) return <div>no data</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      updateInfo.chatName === undefined &&
      updateInfo.password === undefined &&
      !updateInfo.chatAvatar
    ) {
      dispatch(
        setNotification({status: 'error', title: 'UpdateError', description: 'No data to update'}),
      );
      return;
    }
    try {
      await updateChat([chatId, updateInfo]).unwrap();
      dispatch(
        setNotification({
          status: 'success',
          title: 'Chat updated!',
          description: 'Chat updated successfully',
        }),
      );
    } catch (error) {
      console.log(error);
    }
    setUpdateInfo({
      chatName: undefined,
      password: undefined,
      chatAvatar: undefined,
    });
    onClose();
  };

  const {chatName, hasPassword} = data.chatOverview;

  return (
    <section>
      <EditIcon
        as="button"
        color={isAdmin ? 'yellow.500' : 'gray.500'}
        _hover={isAdmin ? {color: 'yellow.600'} : undefined}
        onClick={isAdmin ? onOpen : undefined}
        fontSize="3xl"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Chat Name:</FormLabel>
                <Input
                  type="text"
                  value={updateInfo.chatName}
                  onChange={e => setUpdateInfo({...updateInfo, chatName: e.target.value})}
                  placeholder={chatName}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password:</FormLabel>
                <Input
                  type="password"
                  value={updateInfo.password}
                  onChange={e => setUpdateInfo({...updateInfo, password: e.target.value})}
                  placeholder={hasPassword ? 'update password' : 'define a password'}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Avatar:</FormLabel>
                <Input
                  type="file"
                  onChange={e => setUpdateInfo({...updateInfo, chatAvatar: e.target.files?.[0]})}
                />
              </FormControl>
              <Button type="submit" disabled={isLoading}>
                Update Chat
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default UpdateChat;
