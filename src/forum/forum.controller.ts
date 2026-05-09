import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get('threads')
  async getThreads() {
    return this.forumService.getThreads();
  }

  @Post('threads')
  @UseGuards(AuthGuard('jwt'))
  async createThread(
    @Body() body: { title: string; content: string; author: string },
  ) {
    const agtBalance = await this.forumService.getAgtBalance(body.author);
    return this.forumService.createThread(
      body.title,
      body.content,
      body.author,
      agtBalance,
    );
  }

  @Post('posts')
  @UseGuards(AuthGuard('jwt'))
  async createPost(
    @Body() body: { threadId: number; content: string; author: string },
  ) {
    const agtBalance = await this.forumService.getAgtBalance(body.author);
    return this.forumService.createPost(
      body.threadId,
      body.content,
      body.author,
      agtBalance,
    );
  }
}
