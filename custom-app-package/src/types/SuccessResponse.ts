import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Типизация параметров для SuccessResponse
 */
export class SuccessResponseOptions {
  @ApiProperty({
    example: "Успешный запрос",
    description: "Сообщение (информация) с сервера о состоянии запроса",
  })
  message: string;

  @ApiProperty({
    example: "200",
    description: "Статус ответа с сервера (2XX)",
  })
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
