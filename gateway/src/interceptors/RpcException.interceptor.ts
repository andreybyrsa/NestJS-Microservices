import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

// utils from package
import { RpcCustomException } from 'nestjs-app-utils'

/**
 * Перехватчик ошибок (исключений) из микросервисов
 */
@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // Выбрасываем свое исключение RpcCustomException в gateway приложении
      catchError((error) => throwError(() => new RpcCustomException(error))),
    )
  }
}
