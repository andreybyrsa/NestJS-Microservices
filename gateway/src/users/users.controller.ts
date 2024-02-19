import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Observable } from 'rxjs'

//  project imports
import { JWTUser } from 'src/decorators/JWTUser.decorator'
import { Roles } from 'src/decorators/roles.decorator'
import { UsersService } from './users.service'

// types from package
import { JWTUser as JWTUserType, UserDTO, UserRole } from 'nestjs-app-utils'

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
  getCurrentUser(@JWTUser() jwtUser: JWTUserType) {
    return this.usersService.getCurrentUser(jwtUser)
  }

  @ApiOperation({ summary: 'Получить всех пользователей (роль ADMIN)' })
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
}
