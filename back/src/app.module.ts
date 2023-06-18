import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatService } from './chat/chat.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, ChatService, PrismaService],
})
export class AppModule {}
