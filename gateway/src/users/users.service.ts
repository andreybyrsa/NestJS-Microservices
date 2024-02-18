import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  MicroservicesNames,
  MicroservicesCMDs,
  UserDTO,
  JWTUser,
} from 'nestjs-app-utils'

@Injectable()
export class UsersService {
  constructor(
    @Inject(MicroservicesNames.USERS_MICROSERVICE)
    private readonly nestClient: ClientProxy,
  ) {}

  getCurrentUser(jwtUser: JWTUser) {
    return this.nestClient.send<UserDTO, JWTUser>(
      { cmd: MicroservicesCMDs.GET_CURRENT_USER },
      jwtUser,
    )
  }

  getAllUsers() {
    return this.nestClient.send<UserDTO[]>(
      { cmd: MicroservicesCMDs.GET_ALL_USERS },
      {},
    )
  }
}
