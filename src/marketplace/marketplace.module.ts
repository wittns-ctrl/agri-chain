import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MarketplaceService } from './marketplace.service';
import { MarketplaceController } from './marketplace.controller';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60000, // 60 seconds
    }),
  ],
  providers: [MarketplaceService],
  controllers: [MarketplaceController],
})
export class MarketplaceModule {}
