'use client';

import {authTokenSelector, userIdSelector} from '@/lib/redux';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {SocketService} from '@/services/websocket/socketService';
import {useEffect} from 'react';

function WebSocket(): JSX.Element {
  const authToken = useAppSelector(authTokenSelector);
  const userId = useAppSelector(userIdSelector);
  const hasSocket = SocketService.hasSocket();
  const dispatch = useAppDispatch();

  const needSocket = authToken && !hasSocket && userId;
  const closeSocket = !authToken && hasSocket;

  useEffect(() => {
    if (needSocket) SocketService.initializeSocket(dispatch, authToken, userId);
    else if (closeSocket) SocketService.closeSocket();
    return () => SocketService.closeSocket();
  }, [needSocket, closeSocket, authToken, dispatch, userId]);
  return <></>;
}

export default WebSocket;
