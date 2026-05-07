import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analytics } from './entities/analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private analyticsRepository: Repository<Analytics>,
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

  //get analytics
  async getAnalytics() {
    return await this.analyticsRepository.findOne({
      where: {
        id: 1,
      },
    });
  }
  //auto create row
  async onModuleInit() {
    await this.initializeAnalytics();
  }
}
