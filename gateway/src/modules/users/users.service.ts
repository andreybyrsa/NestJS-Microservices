import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

// utils from package
import {
  MicroservicesNames,
  MicroservicesCMDs,
  UserDTO,
  JWTUser,
  UpdateUserRoleDTO,
  SuccessResponse,
} from 'nestjs-app-utils'

@Injectable()
export class UsersService {
  constructor(
    @Inject(MicroservicesNames.USERS_MICROSERVICE)
    private readonly nestClient: ClientProxy,
  ) {}

  /**
   * Метод сервиса UsersService для получения информации о текущем пользователе
   */
  getCurrentUser(jwtUser: JWTUser) {
    return this.nestClient.send<UserDTO, JWTUser>(
      { cmd: MicroservicesCMDs.GET_CURRENT_USER },
      jwtUser,
    )
  }

  /**
   * Метод сервиса UsersService для получения всех пользователей (доступно для роли ADMIN)
   */
  getAllUsers() {
    return this.nestClient.send<UserDTO[]>(
      { cmd: MicroservicesCMDs.GET_ALL_USERS },
      {},
    )
  }

  /**
   * Метод сервиса UsersService для обновления роли пользователя по id (доступно для роли ADMIN)
   */
  updateUserRole(updateUserRoleDTO: UpdateUserRoleDTO) {
    return this.nestClient.send<SuccessResponse, UpdateUserRoleDTO>(
      { cmd: MicroservicesCMDs.UPDATE_USER_ROLE },
      updateUserRoleDTO,
    )
  }
}
