import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  orderId!: string;

  @Column()
  buyer!: string;

  @Column()
  seller!: string;

  @Column()
  amount!: string;

  @Column()
  quantity!: string;

  @Column({ nullable: true })
  metadataUri?: string;

  @Column({ default: 'created' })
  status!: string;

  @Column({ nullable: true })
  transactionHash?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
