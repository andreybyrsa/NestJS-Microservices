import { Module } from '@nestjs/common'

// project imports
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { NestClientModule } from 'src/nestClient/nestClient.module'

/**
 * Gateway модуль авторизации
 */
@Module({
  imports: [NestClientModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
