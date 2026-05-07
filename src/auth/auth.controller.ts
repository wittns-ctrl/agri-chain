import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifySignatureDto } from './dto/verify-signature.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //nonce

  @Get('nonce')
  getNonce() {
    return {
      nonce: this.authService.generateNonce(),
    };
  }

  //verify signature

  @Post('verify')
  async verify(
    @Body()
    body: VerifySignatureDto,
  ) {
    return this.authService.verifySignature(
      body.message,

      body.signature,
    );
  }
}
