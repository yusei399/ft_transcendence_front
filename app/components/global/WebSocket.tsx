'use client';

import {authTokenSelector} from '@/lib/redux';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {SocketService} from '@/services/websocket/socketService';
import {useEffect} from 'react';

function WebSocket() {
  const authToken = useAppSelector(authTokenSelector);
  const hasSocket = SocketService.hasSocket();
  const dispatch = useAppDispatch();

  const needSocket = authToken && !hasSocket;
  const closeSocket = !authToken && hasSocket;

  useEffect(() => {
    if (needSocket) SocketService.initializeSocket(dispatch, authToken);
    else if (closeSocket) SocketService.closeSocket();
    return () => SocketService.closeSocket();
  }, [needSocket, closeSocket]);
  return null;
}

export default WebSocket;
