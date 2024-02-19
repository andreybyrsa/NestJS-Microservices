import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { Observable } from 'rxjs'

//  project imports
import { JWTUser } from 'src/decorators/JWTUser.decorator'
import { Roles } from 'src/decorators/roles.decorator'
import { UsersService } from './users.service'

// types from package
import {
  JWTUser as JWTUserType,
  SuccessResponse,
  UserDTO,
  UserRole,
} from 'nestjs-app-utils'

@ApiTags('Работа с пользователями')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить информацию о текущем пользователе' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserDTO,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('current')
  getCurrentUser(@JWTUser() jwtUser: JWTUserType): Observable<UserDTO> {
    return this.usersService.getCurrentUser(jwtUser)
  }

  @ApiOperation({
    summary: 'Получить всех пользователей (доступно для роли ADMIN)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: UserDTO,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles([UserRole.ADMIN])
  @Get('all')
  getAllUsers(): Observable<UserDTO[]> {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({
    summary: 'Поменять роль пользователя по id (доступ для роли ADMIN)',
  })
  @ApiParam({ name: 'role', enum: UserRole })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: SuccessResponse,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles([UserRole.ADMIN])
  @Put(':id/:role')
  updateUserRole(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Param(
      'role',
      new ParseEnumPipe(UserRole, {
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    role: UserRole,
  ): Observable<SuccessResponse> {
    return this.usersService.updateUserRole({ id, role })
  }
}
