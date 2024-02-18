import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'
import { RpcCustomException } from 'nestjs-app-utils'

@Catch(RpcCustomException)
export class RpcExceptionToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcCustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const { message, status: statusCode } = exception.getError()
    const response = ctx.getResponse<Response>()

    response.status(statusCode).json({ statusCode, message })
  }
}
