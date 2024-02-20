import { Module } from '@nestjs/common'

// project imports
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'

// utils from package
import { NestClientModule } from 'nestjs-app-utils'

/**
 * Gateway модуль для работы с комментариями пользователей
 */
@Module({
  imports: [NestClientModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
