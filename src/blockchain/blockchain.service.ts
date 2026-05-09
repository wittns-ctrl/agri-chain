import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Contract, JsonRpcProvider } from 'ethers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Batch } from './entities/batch.entity';
import { Order } from './entities/order.entity';
import { Dispute } from './entities/dispute.entity';
import { MailService } from '../mail/mail.service';
import { AnalyticsService } from '../analytics/analytics.service';

type BatchMetadata = {
  batchName: string;
  metadataUri: string;
  owner: string;
  quantity: { toString(): string };
};

type BlockchainContract = {
  getBatchMetadata: (tokenId: string) => Promise<BatchMetadata>;
};

type BatchMintedEvent = {
  tokenId: string;
  recipient: string;
  batchName: string;
  metadataUri: string;
  quantity: number;
};

type OrderCreatedEvent = {
  orderId: string;
  buyer: string;
  seller: string;
  amount: number;
  quantity: number;
  metadataUri: string;
};

type PaymentReleasedEvent = {
  orderId: string;
  recipient: string;
};

type DisputeRaisedEvent = {
  orderId: string;
  raisedBy: string;
  reason: string;
};

type DisputeResolvedEvent = {
  orderId: string;
  outcome: string;
  resolver: string;
};

const contractAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'string', name: 'batchName', type: 'string' },
      { internalType: 'string', name: 'metadataUri', type: 'string' },
      { internalType: 'uint256', name: 'quantity', type: 'uint256' },
    ],
    name: 'mintBatch',
    outputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getBatchMetadata',
    outputs: [
      { internalType: 'string', name: 'batchName', type: 'string' },
      { internalType: 'string', name: 'metadataUri', type: 'string' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'quantity', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'orderId', type: 'string' },
      { internalType: 'address', name: 'buyer', type: 'address' },
      { internalType: 'address', name: 'seller', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'quantity', type: 'uint256' },
      { internalType: 'string', name: 'metadataUri', type: 'string' },
    ],
    name: 'createOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'orderId', type: 'string' },
      { internalType: 'address', name: 'recipient', type: 'address' },
    ],
    name: 'releasePayment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'orderId', type: 'string' },
      { internalType: 'string', name: 'reason', type: 'string' },
    ],
    name: 'raiseDispute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'orderId', type: 'string' },
      { internalType: 'string', name: 'outcome', type: 'string' },
    ],
    name: 'resolveDispute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

@Injectable()
export class BlockchainService implements OnModuleInit {
  private readonly logger = new Logger(BlockchainService.name);
  private provider?: JsonRpcProvider;
  private contract?: Contract & BlockchainContract;
  private rpcUrl?: string;
  private contractAddress?: string;

  constructor(
    @InjectRepository(Batch)
    private readonly batchRepository: Repository<Batch>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Dispute)
    private readonly disputeRepository: Repository<Dispute>,
    private readonly mailService: MailService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  onModuleInit() {
    this.rpcUrl = process.env.CHAIN_RPC_URL || process.env.RPC_URL;
    this.contractAddress =
      process.env.BLOCKCHAIN_CONTRACT_ADDRESS || process.env.CONTRACT_ADDRESS;

    if (!this.rpcUrl || !this.contractAddress) {
      this.logger.warn(
        'Blockchain environment variables are not configured. On-chain reads are disabled.',
      );
      return;
    }

    this.provider = new JsonRpcProvider(this.rpcUrl);
    this.contract = new Contract(
      this.contractAddress,
      contractAbi,
      this.provider,
    ) as Contract & BlockchainContract;
  }

  getStatus() {
    return {
      network: this.rpcUrl ?? null,
      contractAddress: this.contractAddress ?? null,
      connected: !!this.contract,
    };
  }

  async getBatch(tokenId: string) {
    const stored = await this.batchRepository.findOne({ where: { tokenId } });
    if (stored) return stored;

    if (!this.contract) {
      return {
        tokenId,
        status: 'offline',
        message: 'Contract is not configured.',
      };
    }

    try {
      const metadata = await this.contract.getBatchMetadata(tokenId);
      return {
        tokenId,
        batchName: metadata.batchName,
        owner: metadata.owner,
        metadataUri: metadata.metadataUri,
        quantity: Number(metadata.quantity.toString()),
      };
    } catch (error) {
      this.logger.error('Failed to fetch batch metadata', error as Error);
      return { tokenId, status: 'not_found' };
    }
  }

  // Webhook handlers for blockchain events
  async handleBatchMintedEvent(event: BatchMintedEvent) {
    const { tokenId, recipient, batchName, metadataUri, quantity } = event;

    const batch = this.batchRepository.create({
      tokenId,
      batchName,
      owner: recipient,
      metadataUri,
      quantity,
      status: 'minted',
    });
    await this.batchRepository.save(batch);
    await this.analyticsService.incrementBatches();

    // Send email if user email is stored (fallback: no email sent if not available)
    // Note: Email lookup would need user mapping, assuming it's handled elsewhere
  }

  async handleOrderCreatedEvent(event: OrderCreatedEvent) {
    const { orderId, buyer, seller, amount, quantity, metadataUri } = event;

    const order = this.orderRepository.create({
      orderId,
      buyer,
      seller,
      amount,
      quantity,
      metadataUri,
      status: 'created',
    });
    await this.orderRepository.save(order);
    await this.analyticsService.incrementOrders();

    // Send email (fallback: no email if not mapped)
  }

  async handlePaymentReleasedEvent(event: PaymentReleasedEvent) {
    const { orderId } = event;

    const order = await this.orderRepository.findOne({ where: { orderId } });
    if (order) {
      order.status = 'payment_released';
      await this.orderRepository.save(order);
      await this.analyticsService.incrementPayments();
      // Send email
    }
  }

  async handleDisputeRaisedEvent(event: DisputeRaisedEvent) {
    const { orderId, raisedBy, reason } = event;

    const dispute = this.disputeRepository.create({
      orderId,
      raisedBy,
      reason,
      status: 'open',
    });
    await this.disputeRepository.save(dispute);
    await this.analyticsService.incrementDisputes();
    // Send email
  }

  async handleDisputeResolvedEvent(event: DisputeResolvedEvent) {
    const { orderId, outcome, resolver } = event;

    const dispute = await this.disputeRepository.findOne({
      where: { orderId },
    });
    if (dispute) {
      dispute.status = 'resolved';
      dispute.outcome = outcome;
      dispute.resolver = resolver;
      await this.disputeRepository.save(dispute);
      // Send email
    }
  }
}
