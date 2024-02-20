import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// project imports
import { UsersService } from 'src/users/users.service';

// utils from package
import {
  UserResponseDTO,
  LoginRequestDTO,
  RegisterRequestDTO,
  RpcCustomException,
  User,
} from 'nestjs-app-utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Авторизовывает пользователя
   */
  async login(userDTO: LoginRequestDTO): Promise<UserResponseDTO> {
    const { email, password } = userDTO;

    const DBUser = await this.usersService.getUserByEmail(email);
    // Если логин не совпал - отправляем ошибку
    if (!DBUser) {
      throw new RpcCustomException({
        message: 'Ошибка авторизации',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const isMatchPassword = await bcrypt.compare(password, DBUser.password);
    // Если пароль не совпал - отправляем ошибку
    if (!isMatchPassword) {
      throw new RpcCustomException({
        message: 'Ошибка авторизации',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    try {
      const authorizedUser = await this.authorizeUser(DBUser);

      return authorizedUser;
    } catch (error) {
      console.error(error);
      throw new RpcCustomException({
        message: error.message,
        status: HttpStatus.FORBIDDEN,
      });
    }
  }

  /**
   * Регистрирует пользователя с уникальным email
   */
  async register(userDTO: RegisterRequestDTO): Promise<UserResponseDTO> {
    const { email, username, password } = userDTO;

    const existedDBUser = await this.usersService.getUserByEmail(email);

    // Если пользователь с таким email уже существует - отправляем ошибку
    if (existedDBUser) {
      throw new RpcCustomException({
        message: 'Ошибка регистрации',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    try {
      // Хешируем пароль
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await this.usersService.createUser({
        email,
        username,
        password: hashedPassword,
      });

      const authorizedUser = await this.authorizeUser(user);

      return authorizedUser;
    } catch (error) {
      console.error(error);
      throw new RpcCustomException({
        message: 'Ошибка регистрации',
        status: HttpStatus.FORBIDDEN,
      });
    }
  }

  /**
   * Создает accessToken на основе объекта пользователя (без пароля)
   */
  private async authorizeUser(user: User): Promise<UserResponseDTO> {
    const { password, ...restUser } = user;
    const payload = restUser;

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken, ...restUser };
  }
}
