'use client';

import {useGetGameHistoryQuery} from '@/lib/redux/api';
import {useAppSelector, userIdSelector} from '@/lib/redux';

type MatchHistoryProps = {
  userId?: number;
};

function MatchHistory({userId}: MatchHistoryProps) {
  const currentUserId = useAppSelector(userIdSelector) as number;
  const playerId = userId ?? currentUserId;
  const {data} = useGetGameHistoryQuery([playerId]);

  if (!data) return null;

  return (
    <div>
      {data.plays.map(play => {
        const currentPlayer =
          play.player1.profile.userId === playerId ? play.player1 : play.player2;
        const opponent = play.player1.profile.userId === playerId ? play.player2 : play.player1;
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
          <div key={play.gameId}>
            <div>id: {play.gameId}</div>
            <div>start: {startDate}</div>
            <div>end: {endDate}</div>
            <div>winner: {isWinner ? nickname : oppNickname}</div>
          </div>
        );
      })}
    </div>
  );
}

export default MatchHistory;
