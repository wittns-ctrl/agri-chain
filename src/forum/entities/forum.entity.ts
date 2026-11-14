import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class ForumThread {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  author!: string; // wallet address

  @Column({ default: 0 })
  agtBalance!: number; // checked on post

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => ForumPost, (post) => post.thread)
  posts!: ForumPost[];
}

@Entity()
export class ForumPost {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  author!: string; // wallet address

  @Column({ default: 0 })
  agtBalance!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => ForumThread, (thread) => thread.posts)
  thread!: ForumThread;
}
