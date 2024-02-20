import { Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';

// project imports
import { CommentsModule } from './comments/comments.module';

// models from package
import { Comment, NestClientModule, User } from 'nestjs-app-utils';

const port = +process.env.MYSQL_TCP_PORT || 3307;
const database = process.env.MYSQL_DATABASE || 'database';
const username = process.env.MYSQL_USER || 'su';
const password = process.env.MYSQL_PASSWORD || 'do';

/**
 * Начальная конфигурация mysql базы данных
 */
export const mysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'mysql_db',
  port,
  database,
  synchronize: true,
  username,
  password,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...mysqlConfig, entities: [Comment, User] }),
    NestClientModule,
    CommentsModule,
  ],
})
export class AppModule {}
