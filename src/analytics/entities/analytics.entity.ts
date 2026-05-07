import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: 0,
  })
  totalUsers!: number;

  @Column({
    default: 0,
  })
  totalBatches!: number;

  @Column({
    default: 0,
  })
  totalOrders!: number;

  @Column({
    default: 0,
  })
  totalPayments!: number;

  @Column({
    default: 0,
  })
  totalDisputes!: number;
}
