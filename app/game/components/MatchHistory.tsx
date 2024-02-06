'use client';

import {userIdSelector} from '@/lib/redux';
import {useGetGameHistoryQuery} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hook';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
} from '@chakra-ui/react'

type MatchHistoryProps = {
  userId?: number;
};

function MatchHistory({userId}: MatchHistoryProps) {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const currentUserId = useAppSelector(userIdSelector) as number;
  const {data} = useGetGameHistoryQuery([userId ?? currentUserId]);
  if (!data) return null;
  return (
    <div>
      {data.plays.map(play => {
        const currentPlayer =
          play.playerOne.profile.userId === currentUserId ? play.playerOne : play.playerTwo;
        const opponent =
          play.playerOne.profile.userId === currentUserId ? play.playerTwo : play.playerOne;
        const isWinner = play.winnerId === currentPlayer.profile.userId;
        const {userId, nickname, avatarUrl} = currentPlayer.profile;
        const {
          userId: oppUserId,
          nickname: oppNickname,
          avatarUrl: oppAvatarUrl,
        } = opponent.profile;

        const startDate = new Date(play.startDate).toLocaleString();
        const endDate = play.endDate ? new Date(play.endDate).toLocaleString() : 'not finished';
        return (
          
          <TableContainer>
          <Table  key={play.gameId} variant='simple' bg={bgColor} boxShadow="md" borderRadius="lg">
            {/*<TableCaption color={bgColor}>Imperial to metric conversion factors</TableCaption>*/}
            <Thead>
              <Tr>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>id</Td>
                <Td>{play.gameId}</Td>
              </Tr>
              <Tr>
                <Td>start</Td>
                <Td>{startDate}</Td>
              </Tr>
              <Tr>
                <Td>end</Td>
                <Td>{endDate}</Td>
              </Tr>
              <Tr>
                <Td>winner</Td>
                <Td>{isWinner ? nickname : oppNickname}</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        );
      })}
    </div>
  );
}

export default MatchHistory;
