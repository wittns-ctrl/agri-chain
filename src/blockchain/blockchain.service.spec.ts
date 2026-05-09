import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlockchainService } from './blockchain.service';
import { Batch } from './entities/batch.entity';
import { Order } from './entities/order.entity';
import { Dispute } from './entities/dispute.entity';
import { MailService } from '../mail/mail.service';
import { AnalyticsService } from '../analytics/analytics.service';

describe('BlockchainService', () => {
  let service: BlockchainService;

  const repositoryMock = {
    findOne: jest.fn(),
    create: jest.fn().mockReturnThis(),
    save: jest.fn(),
  };

  const mailServiceMock = {
    sendWelcomeEmail: jest.fn(),
    sendBatchMintedEmail: jest.fn(),
  };

  const analyticsServiceMock = {
    incrementBatches: jest.fn(),
    incrementOrders: jest.fn(),
    incrementPayments: jest.fn(),
    incrementDisputes: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockchainService,
        { provide: getRepositoryToken(Batch), useValue: repositoryMock },
        { provide: getRepositoryToken(Order), useValue: repositoryMock },
        { provide: getRepositoryToken(Dispute), useValue: repositoryMock },
        { provide: MailService, useValue: mailServiceMock },
        { provide: AnalyticsService, useValue: analyticsServiceMock },
      ],
    }).compile();

    service = module.get<BlockchainService>(BlockchainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return status', () => {
    const status = service.getStatus();
    expect(status).toHaveProperty('connected');
  });
});
