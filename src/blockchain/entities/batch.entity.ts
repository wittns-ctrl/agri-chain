import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Batch {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: true })
  tokenId?: string;

  @Column({ nullable: true })
  transactionHash?: string;

  @Column()
  batchName!: string;

  @Column()
  owner!: string;

  @Column()
  metadataUri!: string;

  @Column('int')
  quantity!: number;

  @Column({ default: 'minted' })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
