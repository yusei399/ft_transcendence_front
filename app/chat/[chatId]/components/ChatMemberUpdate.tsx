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

const UpdateChatMember = ({chatId, isAdmin, participation}: UpdateChatMemberProps) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {role, mutedUntil, blockedUntil, userId} = participation;

  const [updateMember, {isLoading}] = useUpdateChatMemberMutation();
  const [updateInfo, setUpdateInfo] = useState<HttpUpdateChatParticipation.reqTemplate>({
    userId,
    role: undefined,
    mutedUntil: undefined,
    blockedUntil: undefined,
    kick: undefined,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateMember([chatId, updateInfo]).unwrap();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  const now = new Date().toLocaleDateString().slice(0, 16);
  return (
    <section>
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
                  onChange={(value: Role) => setUpdateInfo({...updateInfo, role: value})}>
                  <Radio value="MEMBER">Member</Radio>
                  <Radio value="ADMIN">Admin</Radio>
                </RadioGroup>
              </FormControl>
              <Flex gap="10px">
                <FormControl>
                  <FormLabel>Mute until:</FormLabel>
                  <Input
                    type="datetime-local"
                    min={now}
                    onChange={e =>
                      setUpdateInfo({
                        ...updateInfo,
                        mutedUntil: e.target.value ? new Date(e.target.value) : undefined,
                      })
                    }
                    placeholder={now}
                  />
                </FormControl>
                <Checkbox
                  size={'lg'}
                  isChecked={updateInfo.kick === true}
                  alignSelf="flex-end"
                  marginBottom="8px"
                  onChange={e =>
                    setUpdateInfo({
                      ...updateInfo,
                      kick: e.target.checked ? true : undefined,
                    })
                  }>
                  kick
                </Checkbox>
              </Flex>
              <Button type="submit">Update Member</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default UpdateChatMember;
