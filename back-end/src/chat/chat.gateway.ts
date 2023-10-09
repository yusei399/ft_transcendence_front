import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;

  // handleConnection(@ConnectedSocket() client: Socket) {
  //   console.log('connection handling');
  //   client.emit('connection', 'You are now connected to the channel.');
  // }
  // handleDisconnect(@ConnectedSocket() client: Socket) {
  //   client.emit('connection', 'You are now disconnected from the channel.');
  // }

  @SubscribeMessage('chat_message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    console.log(data);
    this.server.emit('new_message', data);
  }
}
