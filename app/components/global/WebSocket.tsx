'use client';

import {
  useAppDispatch,
  useAppSelector,
  authTokenSelector,
  userIdSelector,
  socketStatusSelector,
} from '@/lib/redux';
import {SocketService} from '@/services/websocket/socketService';
import {useEffect} from 'react';

function WebSocket() {
  const authToken = useAppSelector(authTokenSelector);
  const userId = useAppSelector(userIdSelector);
  const socketStatus = useAppSelector(socketStatusSelector);
  const dispatch = useAppDispatch();

  const needSocket =
    authToken &&
    userId &&
    (socketStatus === 'DISCONNECTED' || !SocketService.isSocketUsedToken(authToken));
  const closeSocket = (!authToken || !userId) && SocketService.hasSocket();

  useEffect(() => {
    if (needSocket) {
      SocketService.initializeSocket(dispatch, authToken, userId);
    } else if (closeSocket) {
      SocketService.closeSocket();
    }
  }, [needSocket, closeSocket]);
  return null;
}

export default WebSocket;
