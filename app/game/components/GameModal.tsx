import {GameData, cleanLastGameResult} from '@/lib/redux';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalBody,
  CircularProgress,
  Text,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import JoinLeaveWaitList from './JoinLeaveGame';
import {useAppDispatch} from '@/lib/redux/hook';

type GameModalProps = {
  gameData: GameData;
};

function GameModal({gameData}: GameModalProps) {
  const {status, me, opponent} = gameData;
  const dispatch = useAppDispatch();
  const {onClose} = useDisclosure();

  if (status === 'WAIT_START') return null;

  return (
    <Modal isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent justifyContent="center" alignItems="center">
        <ModalHeader textAlign="center" justifySelf="center">
          {status === 'PAUSED'
            ? 'Waiting for opponent'
            : status === 'CANCELED'
              ? 'Game canceled'
              : `Game over`}
        </ModalHeader>
        <ModalBody>
          {status === 'PAUSED' ? (
            <CircularProgress size="120px" isIndeterminate color="green.300" />
          ) : status === 'CANCELED' ? (
            'Game canceled'
          ) : (
            <>
              <Text>{`(You) ${me.score} - ${opponent.score}`}</Text>
              <Text>{me.score > opponent.score ? 'You Win' : 'You Lose'}</Text>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {status === 'PAUSED' ? (
            <JoinLeaveWaitList hasJoined={true} />
          ) : (
            <Button onClick={() => dispatch(cleanLastGameResult())}>Close</Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default GameModal;
