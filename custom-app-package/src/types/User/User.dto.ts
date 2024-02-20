import { ApiProperty } from "@nestjs/swagger";

import { UserRole } from "./User.enum";

/**
 * DTO для получения информации о пользователе
 */
export class UserDTO {
  @ApiProperty({
    example: "dasdas-12321-adasd-asd213-asdsad",
    description: "Уникальный идентификатор (uuid)",
  })
  id: string;

  @ApiProperty({
    example: "1@mail.com",
    description: "Уникальная почта пользователя",
  })
  email: string;

  @ApiProperty({
    example: "user123",
    description: "Логин пользователя",
  })
  username: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: "Роль пользователя",
  })
  role: UserRole;
}

/**
 * Класс для получения пользователя из JWT токена доступа
 */
export class JWTUser {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * DTO пользователя, которая возвращается на клиент при логине и регистрации
 */
export class UserResponseDTO {
  @ApiProperty({
    example: "eyJpZCI6ILTNlM.eyJpZ231CI6ILTNlM.eyJpZCI6ILTNlM2312",
    description: "Токен доступа авторизованного пользователя",
  })
  accessToken: string;

  @ApiProperty({
    example: "1@mail.com",
    description: "Почта авторизованного пользователя",
  })
  email: string;

  @ApiProperty({
    example: "user123",
    description: "Логин авторизованного пользователя",
  })
  username: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: "Роль авторизованного пользователя",
  })
  role: UserRole;
}

/**
 * DTO пользователя, которая присылается с клиента для логина
 */
export class LoginRequestDTO {
  @ApiProperty({
    example: "1@mail.com",
    description: "Почта пользователя c формы авторизации",
  })
  email: string;

  @ApiProperty({
    example: "123-321-abc%",
    description: "Пароль пользователя c формы авторизации",
  })
  password: string;
}

/**
 * DTO пользователя, которая присылается с клиента для регистрации
 */
export class RegisterRequestDTO {
  @ApiProperty({
    example: "1@mail.com",
    description: "Почта пользователя c формы регистрации",
  })
  email: string;

  @ApiProperty({
    example: "user123",
    description: "Логин пользователя c формы регистрации",
  })
  username: string;

  @ApiProperty({
    example: "123-321-abc%",
    description: "Пароль пользователя c формы регистрации",
  })
  password: string;
}

/**
 * DTO для обновления роли пользователя
 */
export class UpdateUserRoleDTO {
  id: string;
  role: UserRole;
}
