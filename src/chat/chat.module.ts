import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.getaway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ChatGateway],
})
export class ChatModule {}
