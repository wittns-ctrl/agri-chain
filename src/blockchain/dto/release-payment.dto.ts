export class ReleasePaymentDto {
  orderId!: string;
  amount!: string;
  recipient!: string;
  email?: string;
}
