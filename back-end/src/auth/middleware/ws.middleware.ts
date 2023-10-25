import {Socket} from 'socket.io';
import {JwtAuthGuard} from '../guard';

type SocketIOMiddleWare = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (): SocketIOMiddleWare => {
  return (client: Socket, next: (err?: Error) => void) => {
    try {
      client.data = JwtAuthGuard.validateToken(client.handshake.auth.token);
      next();
    } catch (err) {
      next(err);
    }
  };
};
