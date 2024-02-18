/**
 * Типизация названий микросервисов
 */
export enum MicroservicesNames {
  USERS_MICROSERVICE = "USERS_MICROSERVICE",
  COMMENTS_MICROSERVICE = "COMMENTS_MICROSERVICE",
}

/**
 * Типизация команд (cmd) для взаимодействия gateway с микросервисами
 */
export enum MicroservicesCMDs {
  AUTH_LOGIN = "AUTH_LOGIN",
  AUTH_REGISTER = "AUTH_REGISTER",

  GET_ALL_USERS = "GET_ALL_USERS",
  GET_CURRENT_USER = "GET_CURRENT_USER",
}
