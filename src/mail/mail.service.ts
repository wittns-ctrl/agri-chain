import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { welcomeTemplate } from './templates/welcome.template';
import { contractAwaitingSignatureTemplate } from './templates/contract-awaiting-signature.template';
import { batchMintedTemplate } from './templates/batch-minted.template';
import { disputeResolvedTemplate } from './templates/dispute-resolved.template';
import { disputeRaisedTemplate } from './templates/dispute-raised.template';
import { newOrderTemplate } from './templates/new-order.template';
import { paymentReleasedTemplate } from './templates/payment-released.template';
import { batchFlaggedTemplate } from './templates/batch-flagged.template';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  // welcome email
  async sendWelcomeEmail(email: string, wallet: string) {
    await this.mailerService.sendMail({
      to: email,

      subject: 'Welcome to Agrichain',

      html: welcomeTemplate(wallet),
    });
  }
  // batch minted email
  async sendBatchMintedEmail(
    email: string,
    batchName: string,
    tokenId: string,
    qrUrl: string,
  ) {
    await this.mailerService.sendMail({
      to: email,

      subject: 'Your Batch Has Been Minted',

      html: batchMintedTemplate(batchName, tokenId, qrUrl),
    });
  }
  // new order email
  async sendNewOrderEmail(
    email: string,
    orderId: string,
    quantity: string,
    dashboardUrl: string,
  ) {
    await this.mailerService.sendMail({
      to: email,

      subject: 'New Order Placed',

      html: newOrderTemplate(orderId, quantity, dashboardUrl),
    });
  }
  // payment released email
  async sendPaymentReleasedEmail(
    email: string,
    orderId: string,
    amount: string,
    dashboardUrl: string,
  ) {
    await this.mailerService.sendMail({
      to: email,

      subject: 'Payment Released',

      html: paymentReleasedTemplate(orderId, amount, dashboardUrl),
    });
  }
  // dispute raised email
  async sendDisputeRaisedEmail(
    email: string,
    orderId: string,
    deadline: string,
    dashboardUrl: string,
  ) {
    await this.mailerService.sendMail({
      to: email,

      subject: 'Dispute Raised',

      html: disputeRaisedTemplate(orderId, deadline, dashboardUrl),
    });
  }
  // dispute resolved email
  async sendDisputeResolvedEmail(
    email: string,
    orderId: string,
    outcome: string,
    dashboardUrl: string,
  ) {
    await this.mailerService.sendMail({
      to: email,

      subject: 'Dispute Resolved',

      html: disputeResolvedTemplate(orderId, outcome, dashboardUrl),
    });
  }
  //B2B contract awaiting signature
  async sendContractAwaitingSignatureEmail(
    email: string,
    crop: string,
    quantity: string,
    price: string,
    schedule: string,
    dashboardUrl: string,
  ) {
    await this.mailerService.sendMail({
      to: email,

      subject: 'B2B Contract Awaiting Signature',

      html: contractAwaitingSignatureTemplate(
        crop,
        quantity,
        price,
        schedule,
        dashboardUrl,
      ),
    });
  }
  // batch flagging email
  async sendBatchFlaggedEmail(
    email: string,
    batchId: string,
    portalUrl: string,
  ) {
    await this.mailerService.sendMail({
      to: email,

      subject: 'Your Batch Has Been Flagged',

      html: batchFlaggedTemplate(batchId, portalUrl),
    });
  }
}
