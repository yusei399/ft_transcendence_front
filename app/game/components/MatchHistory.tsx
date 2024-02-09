'use client';

import {useGetGameHistoryQuery} from '@/lib/redux/api';
import {useAppSelector, userIdSelector} from '@/lib/redux';
import {Box, Text, VStack, useColorModeValue, Flex, HStack, Heading, useBreakpointValue} from '@chakra-ui/react';
import InGamePlayerProfile from './InGamePlayerProfile';

type MatchHistoryProps = {
  userId?: number;
}

function MatchHistory({userId}: MatchHistoryProps) {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const currentUserId = useAppSelector(userIdSelector) as number;
  const playerId = userId ?? currentUserId;
  const {data} = useGetGameHistoryQuery([playerId], {skip: !playerId});
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const justifyContent = useBreakpointValue({ base: 'center', md: 'space-around' });

  if (!data) return null;

  const plays =
    data.plays.toSorted(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    ) ?? [];

  if (plays.length === 0) {
    return (
      <VStack p={5} spacing={4} boxShadow="md" borderRadius="lg" bg={bgColor}>
        <Heading size="md">No games played yet</Heading>
      </VStack>
    );
  }

  return (
    <VStack spacing={4} alignItems="stretch"      maxWidth={{ base: "100%", md: "max-content" }} padding={{ base: "4", md: "8px" }}  overflowY="auto" maxHeight="90vh">
      {plays.map(play => {
        const currentPlayer =
          play.player1.profile.userId === playerId ? play.player1 : play.player2;
        const opponent = play.player1.profile.userId === playerId ? play.player2 : play.player1;
        const isWinner = play.winnerId === currentPlayer.profile.userId;
        const opponnentIsWinner = play.winnerId === opponent.profile.userId;

        const startDate = new Date(play.startDate).toLocaleString();
        const endDate = play.endDate ? new Date(play.endDate).toLocaleString() : 'Not finished';
        return (
          <Box key={play.gameId} p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={bgColor}>
            <Flex flexDir="column" width="100%" textAlign="center" gap="12px">
              <Flex direction={flexDirection} justify={justifyContent} gap="24px">
                <InGamePlayerProfile
                  profile={currentPlayer.profile}
                  score={currentPlayer.score}
                  side={'left'}
                  isMe={true}
                  isWinner={isWinner}
                />
                <InGamePlayerProfile
                  profile={opponent.profile}
                  score={opponent.score}
                  side={'right'}
                  isMe={false}
                  isWinner={opponnentIsWinner}
                />
              </Flex>
              <HStack justifyContent="space-around">
                <Text fontWeight="600">Start: {startDate}</Text>
                <Text fontWeight="600">End: {endDate}</Text>
              </HStack>
            </Flex>
          </Box>
        );
      })}
    </VStack>
  );
}

export default MatchHistory;
