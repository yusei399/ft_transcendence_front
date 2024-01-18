'use client';

import {useAllUsersQuery, useGetChatInfoQuery} from '@/lib/redux/api';
import {HamburgerIcon, RepeatIcon} from '@chakra-ui/icons';
import {
  Text,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import ChatMemberUpdate from './ChatMemberUpdate';
import InviteFriend from './InviteFriend';
import {useRouter} from 'next/navigation';
import SeeUserProfileButton from '@/app/users/components/SeeUserProfileButton';

const ChatMemberList = ({chatId}: {chatId: number}) => {
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {data: usersData} = useAllUsersQuery([]);
  const {data} = useGetChatInfoQuery([chatId]);

  if (data === undefined || usersData === undefined) return null;

  const {otherParticipations} = data;
  const currentParticipation = data.chatOverview.participation;
  const isAdmin = currentParticipation?.role === 'ADMIN' || currentParticipation?.role === 'OWNER';

  return (
    <section>
      <HamburgerIcon
        as="button"
        color={'gray.500'}
        _hover={{color: 'purple.600'}}
        onClick={onOpen}
        fontSize="3xl"
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick>
        <ModalOverlay />
        <ModalContent padding={'20px'} alignItems="center">
          <ModalHeader>
            <Heading size="lg" display="flex" gap="12px" width="100%">
              Members{' '}
              <InviteFriend
                chatId={chatId}
                participantIds={otherParticipations.map(p => p.userId)}
              />
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {otherParticipations.length === 0 && <Text>No other members</Text>}
            {otherParticipations.map(participation => {
              const user = usersData?.users.find(u => u.userId === participation.userId);
              if (!user) return null;
              const {userId, nickname, avatarUrl, isOnline} = user;
              const {role, mutedUntil} = participation;
              const isMuted = mutedUntil ? new Date(mutedUntil) > new Date() : false;
              const nbMessage = data.chatMessages.filter(
                message => message.senderId === userId,
              ).length;

              return (
                <Card key={userId} padding="8px" alignItems={'center'} rowGap="6px">
                  <CardHeader padding={0}>
                    <Flex alignItems="center" justifyContent="space-around" gap="8px">
                      <RepeatIcon
                        color={isOnline ? 'green.500' : 'red.500'}
                        fontSize={isOnline ? '1.4em' : '1.2em'}
                      />
                      <Heading size="md" maxWidth={'80px'}>
                        {nickname}
                      </Heading>
                      <Text>
                        {role === 'OWNER' ? 'Owner' : role === 'ADMIN' ? 'Admin' : 'Member'}
                      </Text>
                    </Flex>
                  </CardHeader>
                  <CardBody padding="6px">
                    <Flex
                      flexFlow="row"
                      justifyContent="space-evenly"
                      alignContent="center"
                      gap="12px"
                      marginBottom="12px">
                      {isAdmin && participation.role !== 'OWNER' && (
                        <ChatMemberUpdate
                          chatId={chatId}
                          isAdmin={isAdmin}
                          participation={participation}
                        />
                      )}
                      <SeeUserProfileButton userId={userId} />
                    </Flex>
                    <Avatar boxSize="80px" src={avatarUrl ?? '/assets/sample.png'} />
                    {isMuted && <Text>Muted</Text>}
                    <Text>
                      {nbMessage} message{nbMessage > 1 ? 's' : ''}
                    </Text>
                  </CardBody>
                </Card>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default ChatMemberList;
