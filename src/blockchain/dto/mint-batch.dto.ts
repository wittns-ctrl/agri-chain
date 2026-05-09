export class MintBatchDto {
  recipient!: string;
  batchName!: string;
  metadataUri!: string;
  quantity!: number;
  email?: string;
}
