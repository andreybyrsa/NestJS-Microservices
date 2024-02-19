import { HttpStatus } from "@nestjs/common";

/**
 * Типизация параметров для SuccessResponse
 */
export class SuccessResponseOptions {
  message: string;
  status: HttpStatus;
}

/**
 * Класс SuccessResponse для отправки на клиент 2XX ответов
 */
export class SuccessResponse {
  constructor({ message, status }: SuccessResponseOptions) {
    this.message = message;
    this.status = status;
  }
  message: string;
  status: HttpStatus;
}
