import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { NestClientModule } from 'src/nestClient/nestClient.module'

@Module({
  imports: [NestClientModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
