import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'

import {
  LoginRequestDTO,
  RegisterRequestDTO,
  MicroservicesNames,
  MicroservicesCMDs,
} from 'nestjs-app-utils'

@Injectable()
export class AuthService {
  constructor(
    @Inject(MicroservicesNames.USERS_MICROSERVICE)
    private readonly nestClient: ClientProxy,
  ) {}

  login(userDTO: LoginRequestDTO): Observable<LoginRequestDTO> {
    return this.nestClient.send<LoginRequestDTO>(
      { cmd: MicroservicesCMDs.AUTH_LOGIN },
      userDTO,
    )
  }

  register(userDTO: RegisterRequestDTO): Observable<RegisterRequestDTO> {
    return this.nestClient.send<RegisterRequestDTO>(
      { cmd: MicroservicesCMDs.AUTH_REGISTER },
      userDTO,
    )
  }
}
