import { Module } from '@nestjs/common'
import { NestClientModule } from 'src/nestClient/nestClient.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { RolesGuard } from 'src/guards/roles.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [NestClientModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class UsersModule {}
