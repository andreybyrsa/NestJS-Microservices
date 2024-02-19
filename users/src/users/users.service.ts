import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// project imports
import { User } from 'src/model/User.entity';

// utils from package
import {
  RegisterRequestDTO,
  RpcCustomException,
  UserDTO,
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
}
