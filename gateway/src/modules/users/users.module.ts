import { Module } from '@nestjs/common'

// project imports
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

// utils from package
import { NestClientModule } from 'nestjs-app-utils'

/**
 * Gateway модуль для работы с пользователями
 */
@Module({
  imports: [NestClientModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
