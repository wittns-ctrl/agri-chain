import { Controller, Get, Param } from '@nestjs/common';

import { QrService } from './qr.service';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get(':batchId/:tokenId')
  async generateQRCode(
    @Param('batchId')
    batchId: string,

    @Param('tokenId')
    tokenId: string,
  ) {
    return this.qrService.generateQRCode(
      batchId,

      tokenId,
    );
  }
}
