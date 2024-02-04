'use client';

import {Flex} from '@chakra-ui/react';
import JoinLeaveWaitList from './components/JoinLeaveGame';
import Loading from '../components/global/Loading';
import {useGetGameQuery, useGetMatchMakingInfoQuery} from '@/lib/redux/api';
import GameInCreation from './components/GameInCreation';
import Game from './Game';
import {
  useAppDispatch,
  useAppSelector,
  setCurrentGame,
  userIdSelector,
  currentGameStatusSelector,
  currentGameIdSelector,
} from '@/lib/redux';
import {useEffect} from 'react';
import GameModal from './components/GameModal';

export default function IndexPage() {
  const {data, isFetching} = useGetMatchMakingInfoQuery([]);
  const currentGameStatus = useAppSelector(currentGameStatusSelector);
  const currentGameId = useAppSelector(currentGameIdSelector);
  const userId = useAppSelector(userIdSelector) as number;
  const {data: getGameData} = useGetGameQuery([data?.gameId ?? -1], {
    skip: data?.gameId === undefined || isFetching,
  });
  const dispatch = useAppDispatch();

  const needToSetCurrentGame =
    data?.gameId !== undefined && currentGameId !== data?.gameId && getGameData;

  useEffect(() => {
    if (needToSetCurrentGame) dispatch(setCurrentGame({...getGameData, userId}));
  }, [needToSetCurrentGame]);

  if (!data || needToSetCurrentGame) return <Loading />;

  const {status, gameId, gameInCreationId} = data;

  if (status === 'IN_GAME_CREATION' && gameInCreationId === undefined) {
    console.error('gameInCreationId is undefined');
    return <Loading />;
  }

  if (status === 'IN_GAME' && gameId === undefined) {
    console.error('gameId is undefined');
    return <Loading />;
  }

  if (
    currentGameStatus &&
    currentGameId &&
    ['PAUSED', 'CANCELED', 'FINISHED'].includes(currentGameStatus as string)
  )
    return <GameModal gameId={currentGameId} />;

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
          {status === 'IN_GAME' && currentGameStatus && <Game />}
        </Flex>
      )}
      <JoinLeaveWaitList hasJoined={status !== 'UNREGISTERED'} />
    </Flex>
  );
}
