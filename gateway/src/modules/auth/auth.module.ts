import { Module } from '@nestjs/common'

// project imports
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

// utils from package
import { NestClientModule } from 'nestjs-app-utils'

/**
 * Gateway модуль авторизации
 */
@Module({
  imports: [NestClientModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
