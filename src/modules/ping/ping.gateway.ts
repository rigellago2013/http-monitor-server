// src/ping/ping.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CLIENT_SOCKET_ORIGIN } from '../../common/utils/constants';

@WebSocketGateway({
  cors: {
    origin: CLIENT_SOCKET_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class PingGateway {
  
  @WebSocketServer()
  server: Server;

  sendUpdate(data: any) {
    this.server.emit('newResponse', data);
  }
}
