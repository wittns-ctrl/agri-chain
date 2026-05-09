import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analytics } from './entities/analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private analyticsRepository: Repository<Analytics>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  // initialize analytics

  async initializeAnalytics() {
    const existing = await this.analyticsRepository.findOne({
      where: {
        id: 1,
      },
    });

    if (!existing) {
      const analytics = this.analyticsRepository.create();

      await this.analyticsRepository.save(analytics);
    }
  }

  //increment users

  async incrementUsers() {
    const analytics = await this.analyticsRepository.findOne({
      where: {
        id: 1,
      },
    });

    if (!analytics) return;

    analytics.totalUsers++;

    await this.analyticsRepository.save(analytics);
  }

  async incrementBatches() {
    const analytics = await this.analyticsRepository.findOne({
      where: {
        id: 1,
      },
    });

    if (!analytics) return;

    analytics.totalBatches++;

    await this.analyticsRepository.save(analytics);
  }

  async incrementOrders() {
    const analytics = await this.analyticsRepository.findOne({
      where: {
        id: 1,
      },
    });

    if (!analytics) return;

    analytics.totalOrders++;

    await this.analyticsRepository.save(analytics);
  }

  async incrementPayments() {
    const analytics = await this.analyticsRepository.findOne({
      where: {
        id: 1,
      },
    });

    if (!analytics) return;

    analytics.totalPayments++;

    await this.analyticsRepository.save(analytics);
  }

  async incrementDisputes() {
    const analytics = await this.analyticsRepository.findOne({
      where: {
        id: 1,
      },
    });

    if (!analytics) return;

    analytics.totalDisputes++;

    await this.analyticsRepository.save(analytics);
  }

  //get analytics
  async getAnalytics() {
    const cacheKey = 'analytics';
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const analytics = await this.analyticsRepository.findOne({
      where: {
        id: 1,
      },
    });

    await this.cacheManager.set(cacheKey, analytics, 300000); // 5 minutes
    return analytics;
  }
  //auto create row
  async onModuleInit() {
    await this.initializeAnalytics();
  }
}
