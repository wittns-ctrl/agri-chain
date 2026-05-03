import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { welcomeTemplate } from './templates/welcome.template';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, wallet: string) {
    await this.mailerService.sendMail({
      to: email,

      subject: 'Welcome to Agrichain',

      html: welcomeTemplate(wallet),
    });
  }
}
