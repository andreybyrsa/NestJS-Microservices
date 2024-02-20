import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// project imports
import { AuthService } from './auth.service';

// types from package
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  MicroservicesCMDs,
} from 'nestjs-app-utils';

@Controller()
export class AuthMicroserviceController {
  constructor(private readonly authSerive: AuthService) {}

  /**
   * Обработчик AUTH_LOGIN команды
   */
  @MessagePattern({ cmd: MicroservicesCMDs.AUTH_LOGIN })
  login(@Payload() userDTO: LoginRequestDTO) {
    return this.authSerive.login(userDTO);
  }

  /**
   * Обработчик AUTH_REGISTER команды
   */
  @MessagePattern({ cmd: MicroservicesCMDs.AUTH_REGISTER })
  register(@Payload() userDTO: RegisterRequestDTO) {
    return this.authSerive.register(userDTO);
  }
}
