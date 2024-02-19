import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { NextFunction } from 'express'
import type { Request, Response } from 'express'

// types from package
import { JWTUser } from 'nestjs-app-utils'

/**
 * JWT мидлвар для проверки авторизации у пользователей из запросов
 */
@Injectable()
export class JWTMidlleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(request: Request, _: Response, next: NextFunction) {
    const bearerToken = this.extractTokenFromHeader(request)

    try {
      // Пробуем раскодировать пользователя из токена
      const user = this.jwtService.verify<JWTUser>(bearerToken, {
        ignoreExpiration: false,
        secret: process.env.JWT_SECRET,
      })

      // Если токен актуален, то добавляем пользовтеля в обЪект запроса
      request['user'] = user

      next()
    } catch (error) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.UNAUTHORIZED,
      )
    }
  }

  /**
   * Возвращает Bearer токен из хедеров запроса
   */
  private extractTokenFromHeader(request: Request): string | null {
    const authorizationString = request.headers['authorization']
    const [type, token] = authorizationString.split(' ') ?? []
    return type === 'Bearer' ? token : null
  }
}
