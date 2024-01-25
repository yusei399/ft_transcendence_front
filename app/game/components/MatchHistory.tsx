'use client';

import {userIdSelector} from '@/lib/redux';
import {useGetGameHistoryQuery} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hook';

type MatchHistoryProps = {
  userId?: number;
};

function MatchHistory({userId}: MatchHistoryProps) {
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
