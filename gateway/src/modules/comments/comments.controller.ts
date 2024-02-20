import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Observable } from 'rxjs'

// project imports
import { CommentsService } from './comments.service'
import { JWTUser } from 'src/decorators/JWTUser.decorator'

// types from package
import {
  JWTUser as JWTUserType,
  RequestCommentDTO,
  ResponseCommentDTO,
  SuccessResponse,
} from 'nestjs-app-utils'

@ApiTags('Комментарии пользователей')
@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Получить все комментарии пользователя' })
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('current-user/all')
  getUserComments(
    @JWTUser() jwtUser: JWTUserType,
  ): Observable<ResponseCommentDTO[]> {
    return this.commentsService.getUserComments(jwtUser)
  }

  @ApiOperation({ summary: 'Создать комментарий' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('create')
  createComment(
    @Body() commentDTO: RequestCommentDTO,
    @JWTUser() jwtUser: JWTUserType,
  ): Observable<ResponseCommentDTO> {
    return this.commentsService.createComment(commentDTO, jwtUser)
  }

  @ApiOperation({ summary: 'Обновить комментарий' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Put(':id/update')
  updateComment(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() commentDTO: RequestCommentDTO,
    @JWTUser() jwtUser: JWTUserType,
  ): Observable<ResponseCommentDTO> {
    return this.commentsService.updateComment(id, commentDTO, jwtUser)
  }

  @ApiOperation({ summary: 'Удалить комментарий' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Delete(':id/delete')
  deleteComment(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @JWTUser() jwtUser: JWTUserType,
  ): Observable<SuccessResponse> {
    return this.commentsService.deleteComment(id, jwtUser)
  }
}
