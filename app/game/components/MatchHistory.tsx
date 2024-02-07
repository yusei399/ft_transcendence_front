"use client";
import { useGetGameHistoryQuery } from '@/lib/redux/api';
import { useAppSelector, userIdSelector } from '@/lib/redux';
import { Box, Text, Avatar, VStack, HStack, Badge } from '@chakra-ui/react';

type MatchHistoryProps = {
  userId?: number;
};


function MatchHistory({userId}: MatchHistoryProps) {
  const currentUserId = useAppSelector(userIdSelector) as number;
  const playerId = userId ?? currentUserId;
  const { data } = useGetGameHistoryQuery([playerId]);

  if (!data) return null;

  return (
    <VStack spacing={4} align="stretch">
      {data.plays.map((play) => {
        const currentPlayer = play.player1.profile.userId === playerId ? play.player1 : play.player2;
        const opponent = play.player1.profile.userId === playerId ? play.player2 : play.player1;
        const isWinner = play.winnerId === currentPlayer.profile.userId;
        

        const startDate = new Date(play.startDate).toLocaleString();
        const endDate = play.endDate ? new Date(play.endDate).toLocaleString() : 'Not finished';

        return (
          <Box key={play.gameId} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
            <HStack spacing={4}>
              <Avatar src={currentPlayer.profile.avatarUrl ?? undefined} />
              <VStack align="start">
                <Text fontWeight="bold">Game ID: {play.gameId}</Text>
                <Text>Start: {startDate}</Text>
                <Text>End: {endDate}</Text>
                <Text>
                  Winner: {isWinner ? currentPlayer.profile.nickname : opponent.profile.nickname}
                </Text>
                {isWinner ? (
                  <Badge colorScheme="green">Win</Badge>
                ) : (
                  <Badge colorScheme="red">Loss</Badge>
                )}
              </VStack>
            </HStack>
          </Box>
        );
      })}
    </VStack>
  );
}

export default MatchHistory;
