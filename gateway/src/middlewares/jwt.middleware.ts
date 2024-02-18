import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { NextFunction } from 'express'
import { Request, Response } from 'express'
import { JWTUser } from 'nestjs-app-utils'

@Injectable()
export class JWTMidlleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(request: Request, _: Response, next: NextFunction) {
    const bearerToken = this.extractTokenFromHeader(request)

    try {
      const user = this.jwtService.verify<JWTUser>(bearerToken, {
        ignoreExpiration: false,
        secret: process.env.JWT_SECRET,
      })
      request['user'] = user

      next()
    } catch (error) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.UNAUTHORIZED,
      )
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authorizationString = request.headers['authorization']
    const [type, token] = authorizationString.split(' ') ?? []
    return type === 'Bearer' ? token : null
  }
}
