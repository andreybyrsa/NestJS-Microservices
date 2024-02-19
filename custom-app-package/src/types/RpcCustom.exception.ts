import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

/**
 * Типизация параметров для RpcCustomException
 */
export class RpcCustomExceptionOptions {
  message: string;
  status: HttpStatus;
}

export class RpcExceptionExpanded extends RpcException {
  getError: () => RpcCustomExceptionOptions;
}

/**
 * Исключение для выборса ошибок в микросервисах
 */
export class RpcCustomException extends RpcExceptionExpanded {
  constructor(options: RpcCustomExceptionOptions) {
    super(options);
  }
}
