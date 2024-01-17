'use client';

import {Flex} from '@chakra-ui/react';
import JoinLeaveWaitList from './components/JoinLeaveGame';
import Loading from '../components/global/Loading';
import {useGetMatchMakingInfoQuery} from '@/lib/redux/api';
import GameInCreation from './components/GameInCreation';

export default function IndexPage() {
  const {data} = useGetMatchMakingInfoQuery([]);

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

  return (
    <Flex height="100%" width="100%" justifyContent="center" alignItems="center" flexFlow="column">
      {(status == 'IN_GAME_CREATION' || status === 'IN_GAME') && (
        <Flex flex={1} width="100%" alignItems="center" justifyContent="center">
          {status === 'IN_GAME_CREATION' && (
            <GameInCreation gameInCreationId={gameInCreationId as number} />
          )}
          {status === 'IN_GAME' && <div>Game Started</div>}
        </Flex>
      )}
      <JoinLeaveWaitList hasJoined={status !== 'UNREGISTERED'} />
    </Flex>
  );
}
