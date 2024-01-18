'use client';

import {useUpdateChatMemberMutation} from '@/lib/redux/api';
import {HttpUpdateChatParticipation} from '@/shared/HttpEndpoints/chat';
import {ChatParticipation, Role} from '@/shared/HttpEndpoints/interfaces';
import {EditIcon} from '@chakra-ui/icons';
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
  Radio,
  RadioGroup,
  useDisclosure,
} from '@chakra-ui/react';
import {useState} from 'react';

type UpdateChatMemberProps = {
  chatId: number;
  isAdmin: boolean;
  participation: ChatParticipation;
};

const UpdateChatMember = ({chatId, isAdmin, participation}: UpdateChatMemberProps): JSX.Element => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {role, userId} = participation;

  const [updateMember, {isLoading}] = useUpdateChatMemberMutation();
  const [updateInfo, setUpdateInfo] = useState<HttpUpdateChatParticipation.reqTemplate>({
    userId,
    role: undefined,
    mutedUntil: undefined,
    kick: undefined,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await updateMember([chatId, updateInfo]).unwrap();
      onClose();
      setUpdateInfo({
        userId,
        role: undefined,
        mutedUntil: undefined,
        kick: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const now = new Date().toLocaleDateString().slice(0, 16);
  return (
    <Flex as="section" justifyContent="center">
      <EditIcon
        as="button"
        color={isAdmin ? 'yellow.500' : 'gray.500'}
        _hover={isAdmin ? {color: 'yellow.600'} : undefined}
        onClick={isAdmin ? onOpen : undefined}
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
                <FormLabel>Role:</FormLabel>
                <RadioGroup
                  value={updateInfo.role ?? role}
                  isDisabled={updateInfo.kick === true}
                  onChange={(value: Role) =>
                    setUpdateInfo({...updateInfo, role: value === role ? undefined : value})
                  }>
                  <Radio
                    value="MEMBER"
                    colorScheme={participation.role === 'MEMBER' ? 'gray' : 'red'}>
                    Member
                  </Radio>
                  <Radio
                    value="ADMIN"
                    colorScheme={participation.role === 'ADMIN' ? 'gray' : 'green'}>
                    Admin
                  </Radio>
                </RadioGroup>
              </FormControl>
              <Flex gap="10px">
                <FormControl>
                  <FormLabel>Mute until:</FormLabel>
                  <Input
                    type="datetime-local"
                    min={now}
                    isDisabled={updateInfo.kick === true || updateInfo.mutedUntil === null}
                    onChange={e =>
                      setUpdateInfo({
                        ...updateInfo,
                        mutedUntil: e.target.value ? new Date(e.target.value) : undefined,
                      })
                    }
                    placeholder={now}
                  />
                </FormControl>
                {participation?.mutedUntil && (
                  <Checkbox
                    size={'lg'}
                    isChecked={updateInfo.mutedUntil === null}
                    alignSelf="flex-end"
                    marginBottom="8px"
                    onChange={e =>
                      setUpdateInfo({
                        ...updateInfo,
                        mutedUntil: e.target.checked ? null : participation.mutedUntil,
                      })
                    }>
                    unmute
                  </Checkbox>
                )}
              </Flex>
              <Checkbox
                size={'lg'}
                isChecked={updateInfo.kick === true}
                width="100%"
                color="red.500"
                margin="12px"
                justifyContent="center"
                colorScheme="red"
                onChange={e =>
                  setUpdateInfo({
                    ...updateInfo,
                    kick: e.target.checked ? true : undefined,
                  })
                }>
                kick
              </Checkbox>
              <Button
                type="submit"
                isDisabled={
                  isLoading ||
                  (updateInfo.role === undefined &&
                    updateInfo.mutedUntil === undefined &&
                    updateInfo.kick === undefined)
                }>
                Update Member
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default UpdateChatMember;
