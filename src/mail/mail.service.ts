import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';
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
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }
  // welcome email
  async sendWelcomeEmail(email: string, wallet: string) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Welcome to Agrichain',
      html: welcomeTemplate(wallet),
    };
    await sgMail.send(msg);
  }
  // batch minted email
  async sendBatchMintedEmail(
    email: string,
    batchName: string,
    tokenId: string,
    qrUrl: string,
  ) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Your Batch Has Been Minted',
      html: batchMintedTemplate(batchName, tokenId, qrUrl),
    };
    await sgMail.send(msg);
  }

  // new order email
  async sendNewOrderEmail(
    email: string,
    orderId: string,
    quantity: string,
    dashboardUrl: string,
  ) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'New Order Placed',
      html: newOrderTemplate(orderId, quantity, dashboardUrl),
    };
    await sgMail.send(msg);
  }

  // payment released email
  async sendPaymentReleasedEmail(
    email: string,
    orderId: string,
    amount: string,
    dashboardUrl: string,
  ) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Payment Released',
      html: paymentReleasedTemplate(orderId, amount, dashboardUrl),
    };
    await sgMail.send(msg);
  }

  // dispute raised email
  async sendDisputeRaisedEmail(
    email: string,
    orderId: string,
    deadline: string,
    dashboardUrl: string,
  ) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Dispute Raised',
      html: disputeRaisedTemplate(orderId, deadline, dashboardUrl),
    };
    await sgMail.send(msg);
  }

  // dispute resolved email
  async sendDisputeResolvedEmail(
    email: string,
    orderId: string,
    outcome: string,
    dashboardUrl: string,
  ) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Dispute Resolved',
      html: disputeResolvedTemplate(orderId, outcome, dashboardUrl),
    };
    await sgMail.send(msg);
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
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'B2B Contract Awaiting Signature',
      html: contractAwaitingSignatureTemplate(
        crop,
        quantity,
        price,
        schedule,
        dashboardUrl,
      ),
    };
    await sgMail.send(msg);
  }

  // batch flagging email
  async sendBatchFlaggedEmail(
    email: string,
    batchId: string,
    portalUrl: string,
  ) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Your Batch Has Been Flagged',
      html: batchFlaggedTemplate(batchId, portalUrl),
    };
    await sgMail.send(msg);
  }
}
