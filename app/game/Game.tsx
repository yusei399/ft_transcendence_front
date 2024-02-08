'use client';

import {Flex, VStack} from '@chakra-ui/react';
import {useAppSelector, currentGameSelector} from '@/lib/redux';
import InGamePlayerProfile from './components/InGamePlayerProfile';
import GameCanvas from './components/GameCanvas';

export default function Game() {
  const currentGame = useAppSelector(currentGameSelector);

  if (!currentGame) return null;

  const leftPlayer = currentGame.me.side === 'left' ? currentGame.me : currentGame.opponent;
  const rightPlayer = currentGame.me.side === 'right' ? currentGame.me : currentGame.opponent;
  return (
    <VStack padding={6} height="100%" width="100%" alignContent="center">
      <Flex height="120px" width="80%" justifyContent="space-around">
        <InGamePlayerProfile
          side="left"
          profile={leftPlayer.profile}
          score={leftPlayer.score}
          isMe={currentGame.me.side === 'left'}
          withChevron={true}
        />
        <InGamePlayerProfile
          side="right"
          profile={rightPlayer.profile}
          score={rightPlayer.score}
          isMe={currentGame.me.side === 'right'}
          withChevron={true}
        />
      </Flex>
      <Flex height="calc(100% - 120px)" width="100%" justifyContent="center" align="center">
        <GameCanvas gameData={currentGame} />
      </Flex>
    </VStack>
  );
}
