import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { JWTUser } from 'nestjs-app-utils'
import { Roles } from 'src/decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const roles = this.reflector.get(Roles, context.getHandler())

    const user: JWTUser = request['user']

    const isMatchRoles = roles?.some((role) => user.role === role)

    if (isMatchRoles || !roles || roles?.length === 0) {
      return true
    }

    throw new HttpException('У вас нет прав', HttpStatus.FORBIDDEN)
  }
}
