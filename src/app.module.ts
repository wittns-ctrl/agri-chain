import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainModule } from './blockchain/blockchain.module';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BlockchainModule, MailModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
