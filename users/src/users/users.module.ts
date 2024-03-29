import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// project imports
import { UsersMicroserviceConrtoller } from './users.controller';
import { UsersService } from './users.service';

import { User } from 'nestjs-app-utils';

/**
 * Модуль микросервиса users для работы с пользователями
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersMicroserviceConrtoller],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
