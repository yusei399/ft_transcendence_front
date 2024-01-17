import {AppDispatch, setNotification} from '@/lib/redux';
import {backEndApi} from '@/lib/redux/api';
import {
  WsBallPosition,
  WsGameInCreationChange,
  WsGameJoin,
  WsGameLeave,
  WsGameMatch,
  WsGameStart,
  WsNewPlayerMove,
} from '@/shared/WsEvents/game/';
import {Socket} from 'socket.io-client';

export function setUpGameEvents(socket: Socket, dispatch: AppDispatch): void {
  socket.on(WsBallPosition.eventName, (message: WsBallPosition.eventMessageTemplate) => {
    console.log(message);
  });

  socket.on(WsNewPlayerMove.eventName, (message: WsNewPlayerMove.eventMessageTemplate) => {
    console.log(message);
  });

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

    console.log(message);
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
