import { Reflector } from '@nestjs/core'

// types from package
import { UserRole } from 'nestjs-app-utils'

/**
 * Декоратор Roles используется указании прав доступа по ролям в обработчике роута
 */
export const Roles = Reflector.createDecorator<UserRole[]>()
