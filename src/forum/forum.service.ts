import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForumThread, ForumPost } from './entities/forum.entity';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(ForumThread)
    private threadRepository: Repository<ForumThread>,
    @InjectRepository(ForumPost)
    private postRepository: Repository<ForumPost>,
  ) {}

  async getThreads() {
    return this.threadRepository.find({
      relations: ['posts'],
      order: { createdAt: 'DESC' },
    });
  }

  async createThread(
    title: string,
    content: string,
    author: string,
    agtBalance: number,
  ) {
    if (agtBalance < 100) {
      throw new Error('Insufficient AGT balance to create thread');
    }

    const thread = this.threadRepository.create({
      title,
      content,
      author,
      agtBalance,
    });
    return this.threadRepository.save(thread);
  }

  async createPost(
    threadId: number,
    content: string,
    author: string,
    agtBalance: number,
  ) {
    if (agtBalance < 100) {
      throw new Error('Insufficient AGT balance to post');
    }

    const post = this.postRepository.create({
      content,
      author,
      agtBalance,
      thread: { id: threadId } as any,
    });
    return this.postRepository.save(post);
  }

  // Mock AGT balance check (in real impl, query blockchain)
  async getAgtBalance(wallet: string): Promise<number> {
    // Placeholder: return mock balance
    return 150; // Assume user has enough
  }
}
