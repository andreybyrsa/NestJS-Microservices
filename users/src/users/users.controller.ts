import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

// project imports
import { UsersService } from './users.service';
import { JWTUser, MicroservicesCMDs, UserDTO } from 'nestjs-app-utils';

@Controller()
export class UsersMicroserviceConrtoller {
  constructor(private readonly usersSerive: UsersService) {}

  /**
   * Обработчик GET_CURRENT_USER команды
   */
  @MessagePattern({ cmd: MicroservicesCMDs.GET_CURRENT_USER })
  getCurrentUser(jwtUser: JWTUser): Promise<UserDTO> {
    return this.usersSerive.getUserById(jwtUser.id);
  }

  /**
   * Обработчик GET_ALL_USERS команды
   */
  @MessagePattern({ cmd: MicroservicesCMDs.GET_ALL_USERS })
  getAllUsers(): Promise<UserDTO[]> {
    return this.usersSerive.getAllUsers();
  }
}
