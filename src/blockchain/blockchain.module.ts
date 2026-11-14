import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';
import { Batch } from './entities/batch.entity';
import { Order } from './entities/order.entity';
import { Dispute } from './entities/dispute.entity';
import { MailModule } from '../mail/mail.module';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Batch, Order, Dispute]),
    MailModule,
    AnalyticsModule,
  ],
  controllers: [BlockchainController],
  providers: [BlockchainService],
  exports: [BlockchainService],
})
export class BlockchainModule {}
