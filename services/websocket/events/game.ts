import {AppDispatch, setCurrentGame, setNotification} from '@/lib/redux';
import {backEndApi} from '@/lib/redux/api';
import {
  WsGameStateUpdatePosition,
  WsGameInCreationChange,
  WsGameJoin,
  WsGameLeave,
  WsGameMatch,
  WsGameStart,
} from '@/shared/WsEvents/game/';
import {Socket} from 'socket.io-client';

export function setUpGameEvents(socket: Socket, dispatch: AppDispatch, userId: number): void {
  socket.on(
    WsGameStateUpdatePosition.eventName,
    (message: WsGameStateUpdatePosition.eventMessageTemplate) => {
      const {gameId, ball, player1: p1, player2: p2, status, rules, countdown} = message;

      const mySide = p1.userId === userId ? 'left' : 'right';
      const opponentSide = p1.userId === userId ? 'right' : 'left';
      const me = {...(p1.userId === userId ? p1 : p2), side: mySide} as const;
      const opponent = {...(p1.userId === userId ? p2 : p1), side: opponentSide} as const;

      dispatch(
        setCurrentGame({
          countdown,
          gameId,
          ball,
          me,
          opponent,
          status,
          rules,
        }),
      );
    },
  );

  socket.on(WsGameJoin.eventName, (message: WsGameJoin.eventMessageTemplate) => {
    dispatch(backEndApi.util.invalidateTags(['GameMatchMaking']));

    const {userId, gameId} = message;
    dispatch(
      setNotification({
        title: 'Game',
        description: `Your opponent joined the game`,
        status: 'info',
      }),
    );
  });

  socket.on(WsGameLeave.eventName, (message: WsGameLeave.eventMessageTemplate) => {
    dispatch(backEndApi.util.invalidateTags(['GameMatchMaking']));

    const {userId, gameId} = message;
    dispatch(
      setNotification({
        title: 'Game',
        description: `Your opponent left the game`,
        status: 'info',
      }),
    );
  });

  socket.on(WsGameMatch.eventName, (message: WsGameMatch.eventMessageTemplate) => {
    dispatch(backEndApi.util.invalidateTags(['GameMatchMaking']));

    dispatch(
      setNotification({
        title: 'Game',
        description: `You found an opponent!`,
        status: 'info',
      }),
    );
  });

  socket.on(
    WsGameInCreationChange.eventName,
    (message: WsGameInCreationChange.eventMessageTemplate) => {
      dispatch(backEndApi.util.invalidateTags(['GameInCreation']));
    },
  );

  socket.on(WsGameStart.eventName, (message: WsGameStart.eventMessageTemplate) => {
    dispatch(backEndApi.util.invalidateTags(['GameMatchMaking', 'Game']));

    dispatch(
      setNotification({
        title: 'Game',
        description: `Game ${message.gameId} started!`,
        status: 'info',
      }),
    );
  });
}
