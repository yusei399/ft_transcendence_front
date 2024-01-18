'use client';
import React, {useState} from 'react';
import {useUpdateChatMutation, useGetChatInfoQuery, ErrorType} from '@/lib/redux/api';
import {HttpUpdateChat} from '@/shared/HttpEndpoints/chat';
import Loading from '@/app/components/global/Loading';
import {
  Button,
  Checkbox,
  Flex,
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
import {setImage} from '@/app/utils/setImage';

const UpdateChat = ({chatId, isOwner}: {chatId: number; isOwner: boolean}): JSX.Element => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const dispatch = useAppDispatch();
  const {data, isLoading: queryLoading} = useGetChatInfoQuery([chatId]);
  const [updateChat, {isLoading}] = useUpdateChatMutation();
  const [updateInfo, setUpdateInfo] = useState<HttpUpdateChat.reqTemplate>({
    chatName: undefined,
    password: undefined,
    chatAvatar: undefined,
  });

  if (queryLoading) return <Loading />;
  if (!data) return <div>no data</div>;

  const reqInvalid = (): boolean => {
    if (isLoading) return true;
    if (updateInfo.chatAvatar && updateInfo.chatAvatar.size > 1024 * 1024) return true;
    if (!updateInfo.chatName && updateInfo.password === undefined && !updateInfo.chatAvatar)
      return true;
    if (updateInfo.chatName && updateInfo.chatName.length < 3) return true;
    if (updateInfo.chatName && updateInfo.chatName.length > 20) return true;
    if (updateInfo.chatName && updateInfo.chatName === data.chatOverview.chatName) return true;
    if (updateInfo.password && updateInfo.password.length < 3) return true;
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (updateInfo.chatName && updateInfo.chatName === data.chatOverview.chatName) {
      dispatch(
        setNotification({
          status: 'warning',
          title: 'Same chat name',
          description: 'Chat name is the same as before',
        }),
      );
      return;
    }
    if (reqInvalid()) return;

    try {
      await updateChat([chatId, updateInfo]).unwrap();
      dispatch(
        setNotification({
          status: 'success',
          title: 'Chat updated!',
          description: 'Chat updated successfully',
        }),
      );
      setUpdateInfo({
        chatName: undefined,
        password: undefined,
        chatAvatar: undefined,
      });
      onClose();
    } catch (error) {
      console.log(error);
      const message =
        (error as ErrorType).status === 409 ? 'Chat name already taken' : 'Something went wrong';
      dispatch(
        setNotification({status: 'error', title: 'Chat creation error', description: message}),
      );
    }
  };

  const {chatName, hasPassword} = data.chatOverview;

  return (
    <section>
      <EditIcon
        as="button"
        color={isOwner ? 'yellow.500' : 'gray.500'}
        _hover={isOwner ? {color: 'yellow.600'} : undefined}
        onClick={isOwner ? onOpen : undefined}
        fontSize="3xl"
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>
                  Chat Name:{' '}
                  {updateInfo.chatName && updateInfo.chatName.length < 3 && ' 3 characters min'}
                  {updateInfo.chatName && updateInfo.chatName.length > 20 && ' 20 characters max'}
                  {updateInfo.chatName &&
                    updateInfo.chatName === data.chatOverview.chatName &&
                    ' need to be different'}
                </FormLabel>
                <Input
                  type="text"
                  minLength={3}
                  maxLength={20}
                  value={updateInfo.chatName ?? ''}
                  onChange={e =>
                    setUpdateInfo({...updateInfo, chatName: e.target.value ?? undefined})
                  }
                  placeholder={chatName}
                />
              </FormControl>
              <Flex gap="10px">
                <FormControl>
                  <FormLabel>
                    Password:
                    {updateInfo.password && updateInfo.password.length < 3 && ' 3 characters min'}
                  </FormLabel>
                  <Input
                    type="password"
                    value={updateInfo.password ?? ''}
                    minLength={3}
                    disabled={updateInfo.password === null}
                    autoComplete="off"
                    onChange={e =>
                      setUpdateInfo({...updateInfo, password: e.target.value ?? undefined})
                    }
                    placeholder={hasPassword ? 'update password' : 'define a password'}
                  />
                </FormControl>
                {hasPassword && (
                  <Checkbox
                    size={'lg'}
                    isChecked={updateInfo.password === null}
                    alignSelf="flex-end"
                    marginBottom="8px"
                    onChange={e =>
                      setUpdateInfo({
                        ...updateInfo,
                        password: e.target.checked ? null : updateInfo.password ?? undefined,
                      })
                    }>
                    Remove
                  </Checkbox>
                )}
              </Flex>
              <FormControl>
                <FormLabel>Avatar:</FormLabel>
                <Input
                  type="file"
                  max={1}
                  accept="image/*"
                  onChange={e => setUpdateInfo({...updateInfo, chatAvatar: setImage(e, dispatch)})}
                />
              </FormControl>
              <Button type="submit" isDisabled={reqInvalid()}>
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
