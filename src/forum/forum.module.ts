import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { ForumThread, ForumPost } from './entities/forum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ForumThread, ForumPost])],
  providers: [ForumService],
  controllers: [ForumController],
})
export class ForumModule {}
