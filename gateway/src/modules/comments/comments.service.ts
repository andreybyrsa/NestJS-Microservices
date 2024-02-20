import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

// types from package
import {
  MicroservicesNames,
  MicroservicesCMDs,
  JWTUser,
  CreateCommentDTO,
  ResponseCommentDTO,
  UpdateCommentDTO,
  RequestCommentDTO,
  DeleteCommentDTO,
  SuccessResponse,
} from 'nestjs-app-utils'

@Injectable()
export class CommentsService {
  constructor(
    @Inject(MicroservicesNames.COMMENTS_MICROSERVICE)
    private readonly nestClient: ClientProxy,
  ) {}

  /**
   * Метод сервиса CommentsService для получения всех комментарий текущего пользователей
   */
  getUserComments(jwtUser: JWTUser) {
    return this.nestClient.send<ResponseCommentDTO[], JWTUser>(
      { cmd: MicroservicesCMDs.GET_USER_COMMENTS },
      jwtUser,
    )
  }

  /**
   * Метод сервиса CommentsService для создания комментария
   */
  createComment(commentDTO: RequestCommentDTO, jwtUser: JWTUser) {
    const { comment } = commentDTO
    const { id: userId } = jwtUser
    const createCommentDTO: CreateCommentDTO = { comment, userId }

    return this.nestClient.send<ResponseCommentDTO, CreateCommentDTO>(
      { cmd: MicroservicesCMDs.CREATE_COMMENT },
      createCommentDTO,
    )
  }

  /**
   * Метод сервиса CommentsService для обновления комментария по id
   */
  updateComment(id: string, commentDTO: RequestCommentDTO, jwtUser: JWTUser) {
    const { comment } = commentDTO
    const { id: userId } = jwtUser
    const updateCommentDTO: UpdateCommentDTO = { id, userId, comment }

    return this.nestClient.send<ResponseCommentDTO, UpdateCommentDTO>(
      { cmd: MicroservicesCMDs.UPDATE_COMMENT },
      updateCommentDTO,
    )
  }

  /**
   * Метод сервиса CommentsService для удаления комментария по id
   */
  deleteComment(id: string, jwtUser: JWTUser) {
    const { id: userId } = jwtUser
    const deleteCommentDTO: DeleteCommentDTO = { id, userId }

    return this.nestClient.send<SuccessResponse, DeleteCommentDTO>(
      { cmd: MicroservicesCMDs.DELETE_COMMENT },
      deleteCommentDTO,
    )
  }
}
