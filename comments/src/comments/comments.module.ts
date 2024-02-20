import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// project imports
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

// utils from package
import { Comment, NestClientModule } from 'nestjs-app-utils';

/**
 * Модуль микросервиса comments для работы с комментариями
 */
@Module({
  imports: [TypeOrmModule.forFeature([Comment]), NestClientModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
