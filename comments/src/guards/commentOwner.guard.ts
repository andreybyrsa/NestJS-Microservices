import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// types from package
import { Comment, RpcCustomException } from 'nestjs-app-utils';

/**
 * Типизация данных из запроса в микросервис
 */
interface RequsetData {
  // id комментария
  id: string;

  // id пользовтеля
  userId: string;
}

/**
 * Guard, который проверяет принадлежность текущего комментария его автору (пользователю)
 */
@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Comment)
    private readonly commensRepository: Repository<Comment>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { id, userId } = context.switchToHttp().getRequest<RequsetData>();

    const currentComment = await this.commensRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (currentComment) return true;

    throw new RpcCustomException({
      message: 'У вас нет прав',
      status: HttpStatus.FORBIDDEN,
    });
  }
}
