import { Injectable } from '@nestjs/common';

import * as QRCode from 'qrcode';

import * as path from 'path';

@Injectable()
export class QrService {
  async generateQRCode(
    batchId: string,

    tokenId: string,
  ) {
    // data encoded inside QR

    const qrData = JSON.stringify({
      batchId,

      tokenId,
    });

    // filename

    const fileName = `batch-${tokenId}.png`;

    // full storage path

    const filePath = path.join(
      process.cwd(),

      'uploads',

      'qrcodes',

      fileName,
    );

    // generate qr image

    await QRCode.toFile(
      filePath,

      qrData,
    );

    // public URL

    const qrUrl = `http://localhost:3000/qrcodes/${fileName}`;

    return {
      fileName,

      filePath,

      qrUrl,
    };
  }
}
