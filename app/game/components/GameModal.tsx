import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalBody,
  CircularProgress,
  ModalFooter,
  Button,
  useDisclosure,
  Flex,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import JoinLeaveWaitList from './JoinLeaveGame';
import {useAppDispatch, useAppSelector, resetCurrentGame, userIdSelector} from '@/lib/redux';
import {useGetGameQuery} from '@/lib/redux/api';
import InGamePlayerProfile from './InGamePlayerProfile';

function GameModal({gameId}: {gameId: number}) {
  const userId = useAppSelector(userIdSelector);
  const {currentData} = useGetGameQuery([gameId]);
  const dispatch = useAppDispatch();
  const {onClose} = useDisclosure();

  if (!currentData || !userId || currentData.status === 'IN_PROGRESS') return null;

  const {player1, player2, status, rules} = currentData;
  const me = player1.profile.userId === userId ? player1 : player2;
  const opponent = player1.profile.userId === userId ? player2 : player1;
  const mySide = player1.profile.userId === userId ? 'left' : 'right';

  return (
    <Modal isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent justifyContent="center" alignItems="center">
        <ModalHeader textAlign="center" justifySelf="center">
          <Heading>
            {status === 'PAUSED'
              ? 'Waiting for opponent'
              : status === 'CANCELED'
                ? 'Game canceled'
                : 'Game over'}
          </Heading>
        </ModalHeader>
        <ModalBody>
          {status === 'PAUSED' ? (
            <CircularProgress size="120px" isIndeterminate color="green.300" />
          ) : status === 'CANCELED' ? (
            'Game canceled'
          ) : (
            <Flex flexDir="column" width="100%" textAlign="center" gap="12px">
              <Flex width="100%" justify="space-around" gap="24px">
                <InGamePlayerProfile
                  profile={me.profile}
                  score={me.score}
                  side={mySide}
                  isMe={true}
                  isWinner={me.score >= rules.scoreToWin}
                />
                <InGamePlayerProfile
                  profile={opponent.profile}
                  score={opponent.score}
                  side={mySide === 'left' ? 'right' : 'left'}
                  isMe={false}
                  isWinner={opponent.score >= rules.scoreToWin}
                />
              </Flex>
              <Heading size="md">{me.score > opponent.score ? 'You Win' : 'You Lose'}</Heading>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          {status === 'PAUSED' ? (
            <JoinLeaveWaitList hasJoined={true} />
          ) : (
            <Button onClick={() => dispatch(resetCurrentGame())}>Close</Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default GameModal;
