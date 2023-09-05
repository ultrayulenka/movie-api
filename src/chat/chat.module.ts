import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.getaway';

@Module({
  providers: [ChatGateway],
})
export class ChatModule {}
