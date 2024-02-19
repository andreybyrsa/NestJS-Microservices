import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

// project imports
import { NestClientModule } from 'src/modules/nestClient/nestClient.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { RolesGuard } from 'src/guards/roles.guard'

/**
 * Gateway модуль для работы с пользователями
 */
@Module({
  imports: [NestClientModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      // Добавляем RolesGuard всему контроллеру
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class UsersModule {}
