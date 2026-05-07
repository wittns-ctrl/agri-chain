import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SiweMessage } from 'siwe';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  // generate nonce

  generateNonce() {
    return Math.random().toString(36).substring(2);
  }

  //verify signature

  async verifySignature(message: string, signature: string) {
    try {
      const siweMessage = new SiweMessage(message);
      const result = await siweMessage.verify({
        signature,
      });

      // wallet address

      const wallet = result.data.address;

      //generate jwt

      const token = this.jwtService.sign({
        wallet,
      });
      return {
        success: true,
        wallet,
        token,
      };
    } catch {
      return {
        success: false,
      };
    }
  }
}
