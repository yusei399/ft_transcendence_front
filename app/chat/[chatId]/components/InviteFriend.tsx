'use client';

import UsersList from '@/app/users/components/UsersList';
import {PlusSquareIcon} from '@chakra-ui/icons';
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

type InviteFriendProps = {
  chatId: number;
  participantIds: number[];
};

const InviteFriend = ({chatId, participantIds}: InviteFriendProps): JSX.Element => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <Flex as="section" justifyContent="center" marginBottom="12px">
      <PlusSquareIcon as="button" fontSize="3xl" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite a friend?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UsersList
              invitationButton="chat"
              filter="friendsOnly"
              targetChatId={chatId}
              toExclude={participantIds}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default InviteFriend;
