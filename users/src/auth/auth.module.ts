import { Module } from '@nestjs/common';
import { JwtModule, type JwtModuleOptions } from '@nestjs/jwt';

// project imports
import { AuthMicroserviceController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

// Конфигурация JWT модуля
const jwtModuleOptions: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
};

/**
 * Модуль микросервиса users для авторизации
 */
@Module({
  imports: [UsersModule, JwtModule.register(jwtModuleOptions)],
  controllers: [AuthMicroserviceController],
  providers: [AuthService],
})
export class AuthModule {}
