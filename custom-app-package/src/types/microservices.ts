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
  GET_USER_BY_ID = "GET_USER_BY_ID",
  UPDATE_USER_ROLE = "UPDATE_USER_ROLE",

  GET_USER_COMMENTS = "GET_USER_COMMENTS",
  CREATE_COMMENT = "CREATE_COMMENT",
  UPDATE_COMMENT = "UPDATE_COMMENT",
  DELETE_COMMENT = "DELETE_COMMENT",
}
