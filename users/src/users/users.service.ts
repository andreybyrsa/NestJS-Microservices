import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// utils from package
import {
  RegisterRequestDTO,
  RpcCustomException,
  SuccessResponse,
  UpdateUserRoleDTO,
  UserDTO,
  User,
} from 'nestjs-app-utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Возвращает пользователя по id из бд
   */
  async getUserById(id: string): Promise<UserDTO> {
    try {
      const currentUser = await this.usersRepository
        .findOne({ where: { id } })
        .then(({ password, ...restUser }) => restUser);

      return currentUser;
    } catch (error) {
      console.error(error);
      throw new RpcCustomException({
        message: 'Ошибка получения пользователя',
        status: HttpStatus.FORBIDDEN,
      });
    }
  }

  /**
   * Возвращает пользователя из бд по его уникальному email
   */
  getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  /**
   * Возвращает список пользователей из бд (роль ADMIN)
   */
  async getAllUsers(): Promise<UserDTO[]> {
    try {
      const users = await this.usersRepository
        .find()
        .then((users) => users.map(({ password, ...restUser }) => restUser));

      return users;
    } catch (error) {
      console.error(error);
      throw new RpcCustomException({
        message: 'Ошибка получения всех пользователей',
        status: HttpStatus.FORBIDDEN,
      });
    }
  }

  /**
   * Создает пользователя в бд
   */
  createUser(userDTO: RegisterRequestDTO): Promise<User> {
    try {
      const user = this.usersRepository.create(userDTO);

      return this.usersRepository.save(user);
    } catch (error) {
      console.error(error);
      throw new RpcCustomException({
        message: 'Ошибка создания пользователя',
        status: HttpStatus.FORBIDDEN,
      });
    }
  }

  /**
   * Обновляет роль пользователя (доступно для роли ADMIN)
   */
  async updateUserRole(
    updateUserRoleDTO: UpdateUserRoleDTO,
  ): Promise<SuccessResponse> {
    const { id, role } = updateUserRoleDTO;

    const isExistUser = await this.usersRepository.exists({
      where: { id },
    });

    if (!isExistUser) {
      throw new RpcCustomException({
        message: 'Пользователь не найден',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    try {
      await this.usersRepository.update({ id }, { role });

      return new SuccessResponse({
        message: 'Успешное обновление роли пользователя',
        status: HttpStatus.OK,
      });
    } catch (error) {
      console.error(error);
      throw new RpcCustomException({
        message: 'Ошибка обновления роли пользователя',
        status: HttpStatus.FORBIDDEN,
      });
    }
  }
}
