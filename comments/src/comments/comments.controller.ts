import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// project imports
import { CommentsService } from './comments.service';
import { CommentOwnerGuard } from 'src/guards/commentOwner.guard';

// types from package
import {
  CreateCommentDTO,
  DeleteCommentDTO,
  JWTUser,
  MicroservicesCMDs,
  ResponseCommentDTO,
  SuccessResponse,
  UpdateCommentDTO,
} from 'nestjs-app-utils';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /**
   * Обработчик GET_USER_COMMENTS команды
   */
  @MessagePattern({ cmd: MicroservicesCMDs.GET_USER_COMMENTS })
  getUserComments(@Payload() jwtUser: JWTUser): Promise<ResponseCommentDTO[]> {
    return this.commentsService.getUserComments(jwtUser);
  }

  /**
   * Обработчик CREATE_COMMENT команды
   */
  @MessagePattern({ cmd: MicroservicesCMDs.CREATE_COMMENT })
  createComment(
    @Payload() commentDTO: CreateCommentDTO,
  ): Promise<ResponseCommentDTO> {
    return this.commentsService.createComment(commentDTO);
  }

  /**
   * Обработчик UPDATE_COMMENT команды
   */
  @MessagePattern({ cmd: MicroservicesCMDs.UPDATE_COMMENT })
  @UseGuards(CommentOwnerGuard)
  updateComment(
    @Payload() commentDTO: UpdateCommentDTO,
  ): Promise<ResponseCommentDTO> {
    return this.commentsService.updateComment(commentDTO);
  }

  /**
   * Обработчик DELETE_COMMENT команды
   */
  @MessagePattern({ cmd: MicroservicesCMDs.DELETE_COMMENT })
  @UseGuards(CommentOwnerGuard)
  deleteComment(
    @Payload() commentDTO: DeleteCommentDTO,
  ): Promise<SuccessResponse> {
    return this.commentsService.deleteComment(commentDTO);
  }
}
