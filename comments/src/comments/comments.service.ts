import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

// types from package
import {
  Comment,
  CreateCommentDTO,
  DeleteCommentDTO,
  JWTUser,
  MicroservicesCMDs,
  MicroservicesNames,
  ResponseCommentDTO,
  RpcCustomException,
  SuccessResponse,
  UpdateCommentDTO,
  UserDTO,
} from 'nestjs-app-utils';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,

    @Inject(MicroservicesNames.USERS_MICROSERVICE)
    private readonly nestClient: ClientProxy,
  ) {}

  /**
   * Возвращает список комментариев текущего пользователя
   */
  async getUserComments(jwtUser: JWTUser) {
    const { id } = jwtUser;

    try {
      const commentsDTO = await this.commentsRepository
        .find({
          where: { user: { id } },
          relations: ['user'],
          order: { updatedAt: 'DESC' },
        })
        .then<ResponseCommentDTO[]>((DBcomments) =>
          DBcomments.map((comment) => this.commentDTOmapper(comment)),
        );

      return commentsDTO;
    } catch (error) {
      console.error(error);
      throw new RpcCustomException({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /**
   * Создает новый комметарий в бд
   */
  async createComment(commentDTO: CreateCommentDTO) {
    const { comment, userId } = commentDTO;

    try {
      // Получаем DTO текущего пользователя через микросервис users
      const user = await firstValueFrom<UserDTO>(
        this.nestClient.send({ cmd: MicroservicesCMDs.GET_USER_BY_ID }, userId),
      );

      const newComment = this.commentsRepository.create({
        comment,
        user,
      });

      // Сохраняем комментарий в бд и преобразуем его в DTO
      const savedComment = await this.commentsRepository
        .save(newComment)
        .then<ResponseCommentDTO>((comment) => this.commentDTOmapper(comment));

      return savedComment;
    } catch (error) {
      console.error(error);
      throw new RpcCustomException({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /**
   * Обновляет комментарий по id в бд
   */
  async updateComment(commentDTO: UpdateCommentDTO) {
    const { id, comment } = commentDTO;

    try {
      await this.commentsRepository.update({ id }, { comment });

      const updatedComment = await this.commentsRepository
        .findOne({ where: { id }, relations: ['user'] })
        .then((DBComment) => this.commentDTOmapper(DBComment));

      return updatedComment;
    } catch (error) {
      console.error(error);
      throw new RpcCustomException({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /**
   * Удаляет комментарий по id в бд
   */
  async deleteComment(commentDTO: DeleteCommentDTO) {
    const { id } = commentDTO;

    try {
      await this.commentsRepository.delete({ id });

      return new SuccessResponse({
        message: 'Успешное удаление комментария',
        status: HttpStatus.OK,
      });
    } catch (error) {
      console.error(error);
      throw new RpcCustomException({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /**
   * Преобразует модель Comment из бд в ResponseCommentDTO
   */
  private commentDTOmapper(commentEntity: Comment): ResponseCommentDTO {
    const { id, comment, createdAt, updatedAt, user } = commentEntity;
    return {
      id,
      userId: user.id,
      comment,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  }
}
