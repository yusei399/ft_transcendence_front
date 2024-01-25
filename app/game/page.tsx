'use client';

import {
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  CircularProgress,
  Button,
  Text,
} from '@chakra-ui/react';
import JoinLeaveWaitList from './components/JoinLeaveGame';
import Loading from '../components/global/Loading';
import {useGetMatchMakingInfoQuery} from '@/lib/redux/api';
import GameInCreation from './components/GameInCreation';
import GameView from './Game';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {resetCurrentGame, selectCurrentGame} from '@/lib/redux';

export default function IndexPage() {
  const {data, refetch} = useGetMatchMakingInfoQuery([]);
  const currentGame = useAppSelector(selectCurrentGame);
  const dispatch = useAppDispatch();
  const {onClose} = useDisclosure();

  if (!data) return <Loading />;

  const {status, gameId, gameInCreationId} = data;

  if (status === 'IN_GAME_CREATION' && gameInCreationId === undefined) {
    console.error('gameInCreationId is undefined');
    return <Loading />;
  }

  if (status === 'IN_GAME' && gameId === undefined) {
    console.error('gameId is undefined');
    return <Loading />;
  }

  if (currentGame && currentGame.status !== 'IN_PROGRESS') {
    return (
      <Modal isOpen={true} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent justifyContent="center" alignItems="center">
          <ModalHeader textAlign="center" justifySelf="center">
            {currentGame.status === 'PAUSED'
              ? 'Waiting for opponent'
              : currentGame.status === 'CANCELED'
                ? 'Game canceled'
                : `Game over`}
          </ModalHeader>
          <ModalBody>
            {currentGame.status === 'PAUSED' ? (
              <CircularProgress size="120px" isIndeterminate color="green.300" />
            ) : currentGame.status === 'CANCELED' ? (
              'Game canceled'
            ) : (
              <>
                <Text>{`(You) ${currentGame.me.score} - ${currentGame.opponent.score}`}</Text>
                <Text>
                  {currentGame.me.score > currentGame.opponent.score ? 'You Win' : 'You Lose'}
                </Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {currentGame.status === 'PAUSED' ? (
              <JoinLeaveWaitList hasJoined={true} />
            ) : (
              <Button
                onClick={() => {
                  dispatch(resetCurrentGame());
                  refetch();
                }}>
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Flex
      height="100%"
      width="100%"
      justifyContent="center"
      alignItems="center"
      flexFlow="column"
      rowGap="12px">
      {(status == 'IN_GAME_CREATION' || status === 'IN_GAME') && (
        <Flex flex={1} width="100%" height="90%" alignItems="center" justifyContent="center">
          {status === 'IN_GAME_CREATION' && (
            <GameInCreation gameInCreationId={gameInCreationId as number} />
          )}
          {status === 'IN_GAME' && currentGame && (
            <GameView gameId={gameId as number} currentGame={currentGame} />
          )}
        </Flex>
      )}
      <JoinLeaveWaitList hasJoined={status !== 'UNREGISTERED'} />
    </Flex>
  );
}
