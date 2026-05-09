export class CreateOrderDto {
  orderId!: string;
  buyer!: string;
  seller!: string;
  amount!: string;
  quantity!: string;
  metadataUri?: string;
  email?: string;
}
