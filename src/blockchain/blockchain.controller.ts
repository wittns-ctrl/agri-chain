import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('status')
  getStatus() {
    return this.blockchainService.getStatus();
  }

  @Get('batches/:tokenId')
  getBatch(@Param('tokenId') tokenId: string) {
    return this.blockchainService.getBatch(tokenId);
  }

  // Webhook endpoint for Alchemy events
  @Post('webhooks/events')
  handleWebhook(@Body() event: any) {
    const { eventType, data } = event;

    switch (eventType) {
      case 'BatchMinted':
        return this.blockchainService.handleBatchMintedEvent(data);
      case 'OrderCreated':
        return this.blockchainService.handleOrderCreatedEvent(data);
      case 'PaymentReleased':
        return this.blockchainService.handlePaymentReleasedEvent(data);
      case 'DisputeRaised':
        return this.blockchainService.handleDisputeRaisedEvent(data);
      case 'DisputeResolved':
        return this.blockchainService.handleDisputeResolvedEvent(data);
      default:
        return { status: 'ignored' };
    }
  }
}
