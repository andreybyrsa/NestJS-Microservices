import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Request } from 'express'

// types from package
import { JWTUser } from 'nestjs-app-utils'

// project imports
import { Roles } from 'src/decorators/roles.decorator'

/**
 * Guard, который сопоставляет роли текущего пользователя и роли доступа обработчика роута
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const roles = this.reflector.get(Roles, context.getHandler())

    // Текущий пользователь из запроса
    const user: JWTUser = request['user']

    const isMatchRoles = roles?.some((role) => user.role === role)

    // Если у обработчика роута не указаны роли доступа или роли совпали с ролями пользователя, то разрешаем доступ
    if (isMatchRoles || !roles || roles?.length === 0) {
      return true
    }

    // Иначе выбрасываем исключение
    throw new HttpException('У вас нет прав', HttpStatus.FORBIDDEN)
  }
}
