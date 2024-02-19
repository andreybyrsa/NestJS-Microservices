import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'

/**
 * Декоратор JWTUser используется в параметрах обработчика роута - достает текущего пользователя из запроса
 */
export const JWTUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>()
    return request['user']
  },
)
