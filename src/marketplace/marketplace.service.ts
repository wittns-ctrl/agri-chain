import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class MarketplaceService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getListings() {
    const cacheKey = 'marketplace_listings';
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    // Mock The Graph query (replace with real GraphQL client)
    const listings = [
      { id: 1, name: 'Corn Batch', price: '100', quantity: '50' },
      { id: 2, name: 'Wheat Batch', price: '80', quantity: '30' },
    ];

    await this.cacheManager.set(cacheKey, listings, 60000); // 60 seconds TTL
    return listings;
  }
}
