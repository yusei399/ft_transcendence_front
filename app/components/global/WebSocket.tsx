'use client';

import {useAppDispatch, useAppSelector, authTokenSelector, userIdSelector} from '@/lib/redux';
import {SocketService} from '@/services/websocket/socketService';
import {useEffect} from 'react';

function WebSocket() {
  const authToken = useAppSelector(authTokenSelector);
  const userId = useAppSelector(userIdSelector);
  const dispatch = useAppDispatch();

  const isAuthTokenValid = authToken && authToken.expiresAt > Date.now();
  const needSocket = isAuthTokenValid && userId && !SocketService.isSocketConnected();
  const closeSocket = (!authToken || !userId) && SocketService.hasSocket();

  useEffect(() => {
    if (needSocket) {
      SocketService.initializeSocket(dispatch, authToken.token, userId);
    } else if (closeSocket) {
      SocketService.closeSocket();
    }
  }, [needSocket, closeSocket]);
  return null;
}

export default WebSocket;
