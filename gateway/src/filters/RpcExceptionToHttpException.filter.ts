import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import type { Response } from 'express'

// utils from package
import { RpcCustomException } from 'nestjs-app-utils'

/**
 * Фильтр ошибок (исключений) из микросервисов, преобразует RpcCustomException в HttpException
 */
@Catch(RpcCustomException)
export class RpcExceptionToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcCustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const { message, status: statusCode } = exception.getError()
    const response = ctx.getResponse<Response>()

    response.status(statusCode).json({ statusCode, message })
  }
}
