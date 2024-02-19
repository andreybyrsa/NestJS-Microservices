import { Controller, Post, Body, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

// project imports
import { AuthService } from './auth.service'

// types from package
import {
  UserResponseDTO,
  LoginRequestDTO,
  RegisterRequestDTO,
} from 'nestjs-app-utils'

@ApiTags('Авторизация')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Логин (вход в аккаунт)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserResponseDTO,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('login')
  login(@Body() userDTO: LoginRequestDTO) {
    return this.authService.login(userDTO)
  }

  @ApiOperation({ summary: 'Регистрация (создание аккаунта)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserResponseDTO,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('register')
  register(@Body() userDTO: RegisterRequestDTO) {
    return this.authService.register(userDTO)
  }
}
