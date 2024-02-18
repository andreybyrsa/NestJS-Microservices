import { type DynamicModule, Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { MicroservicesNames } from 'nestjs-app-utils'

const usersServiceOptions = {
  host: process.env.USERS_HOST || '127.0.0.1',
  port: +process.env.USERS_PORT || 3040,
}

const commentsServiceOptions = {
  host: process.env.COMMENTS_HOST || '127.0.0.1',
  port: +process.env.COMMENTS_PORT || 3050,
}

const registeredModule: DynamicModule = ClientsModule.register([
  {
    name: MicroservicesNames.USERS_MICROSERVICE,
    transport: Transport.TCP,
    options: usersServiceOptions,
  },
  {
    name: MicroservicesNames.COMMENTS_MICROSERVICE,
    transport: Transport.TCP,
    options: commentsServiceOptions,
  },
])

@Module({
  imports: [registeredModule],
  exports: [registeredModule],
})
export class NestClientModule {}
