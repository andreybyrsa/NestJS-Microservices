import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO, которое присылается с клиента для создания и обновления комментария
 */
export class RequestCommentDTO {
  @ApiProperty({
    example: "Комментрий 1",
    description: "Содержание комментария",
  })
  comment: string;
}

/**
 * DTO комментария, которое отсылается на клиент
 */
export class ResponseCommentDTO {
  @ApiProperty({
    example: "dasdas-12321-adasd-asd213-asdsad",
    description: "Уникальный идентификатор комментария (uuid)",
  })
  id: string;

  @ApiProperty({
    example: "12321-adasd-dsd213-asd213-asdsad",
    description: "Уникальный идентификатор автора комментария (uuid)",
  })
  userId: string;

  @ApiProperty({
    example: "Комментрий 1",
    description: "Содержание комментария",
  })
  comment: string;

  @ApiProperty({
    example: "2024-02-20T16:43:43.804Z",
    description: "Дата создания комментария",
  })
  createdAt: string;

  @ApiProperty({
    example: "2024-02-20T16:43:43.804Z",
    description: "Дата обновления комментария",
  })
  updatedAt: string;
}

/**
 * DTO, которое отправляется в микросервис comments для создания комментария
 */
export class CreateCommentDTO extends RequestCommentDTO {
  userId: string;
}

/**
 * DTO, которое отправляется в микросервис comments для обновления комментария
 */
export class UpdateCommentDTO extends RequestCommentDTO {
  id: string;
  userId: string;
}

/**
 * DTO, которое отправляется в микросервис comments для удаления комментария
 */
export class DeleteCommentDTO {
  id: string;
  userId: string;
}
