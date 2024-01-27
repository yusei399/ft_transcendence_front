'use client';

import {Flex} from '@chakra-ui/react';
import JoinLeaveWaitList from './components/JoinLeaveGame';
import Loading from '../components/global/Loading';
import {useGetGameQuery, useGetMatchMakingInfoQuery} from '@/lib/redux/api';
import GameInCreation from './components/GameInCreation';
import Game from './Game';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {
  resetCurrentGame,
  currentGameSelector,
  setCurrentGame,
  userIdSelector,
  lastGameResultSelector,
  GameData,
} from '@/lib/redux';
import {useEffect} from 'react';
import GameModal from './components/GameModal';

export default function IndexPage() {
  const {data, isFetching, refetch} = useGetMatchMakingInfoQuery([]);
  const currentGame = useAppSelector(currentGameSelector);
  const lastGameResult = useAppSelector(lastGameResultSelector);
  const userId = useAppSelector(userIdSelector) as number;
  const {data: getGameData} = useGetGameQuery([data?.gameId ?? -1], {
    skip: data?.gameId === undefined || isFetching,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data || isFetching) return;
    if (data.status !== 'IN_GAME' && currentGame) dispatch(resetCurrentGame());
    else if (data.status === 'IN_GAME' && getGameData && !getGameData.endedAt && !currentGame)
      dispatch(setCurrentGame({...getGameData, userId}));
  }, [data, getGameData, currentGame, isFetching]);

  if (!data || (data.status === 'IN_GAME' && getGameData && !getGameData?.endedAt && !currentGame))
    return <Loading />;

  const {status, gameId, gameInCreationId} = data;

  if (status === 'IN_GAME_CREATION' && gameInCreationId === undefined) {
    console.error('gameInCreationId is undefined');
    return <Loading />;
  }

  if (status === 'IN_GAME' && gameId === undefined) {
    console.error('gameId is undefined');
    return <Loading />;
  }

  if ((currentGame && currentGame?.status !== 'IN_PROGRESS') || lastGameResult) {
    return <GameModal gameData={currentGame ?? (lastGameResult as GameData)} />;
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
            <Game gameId={gameId as number} currentGame={currentGame} />
          )}
        </Flex>
      )}
      <JoinLeaveWaitList hasJoined={status !== 'UNREGISTERED'} />
    </Flex>
  );
}
