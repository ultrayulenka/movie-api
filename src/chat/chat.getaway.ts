import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UseGuards, OnModuleInit } from '@nestjs/common';
import { WsAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.model';
import { UserParam } from 'src/auth/user.decorator';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Connected', socket.id);
    });
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() data: string, @UserParam() user: User) {
    this.server.sockets.emit('receive_message', {
      msg: 'New Message',
      content: `${user?.username || user?.email || 'Guest'}: ${data}`,
    });
  }
}
