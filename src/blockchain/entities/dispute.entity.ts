import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Dispute {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderId!: string;

  @Column()
  raisedBy!: string;

  @Column()
  reason!: string;

  @Column({ default: 'open' })
  status!: string;

  @Column({ nullable: true })
  outcome?: string;

  @Column({ nullable: true })
  resolver?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
