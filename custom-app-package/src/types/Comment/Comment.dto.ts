/**
 * DTO, которое присылается с клиента для создания и обновления комментария
 */
export class RequestCommentDTO {
  comment: string;
}

/**
 * DTO комментария, которое отсылается на клиент
 */
export class ResponseCommentDTO {
  id: string;
  userId: string;
  comment: string;
  createdAt: string;
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
