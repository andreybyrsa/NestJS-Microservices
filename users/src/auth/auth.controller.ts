import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  MicroservicesCMDs,
} from 'nestjs-app-utils';

@Controller()
export class AuthMicroserviceController {
  constructor(private readonly authSerive: AuthService) {}

  @MessagePattern({ cmd: MicroservicesCMDs.AUTH_LOGIN })
  login(userDTO: LoginRequestDTO) {
    return this.authSerive.login(userDTO);
  }

  @MessagePattern({ cmd: MicroservicesCMDs.AUTH_REGISTER })
  register(userDTO: RegisterRequestDTO) {
    return this.authSerive.register(userDTO);
  }
}
