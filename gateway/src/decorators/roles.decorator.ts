import { Reflector } from '@nestjs/core'
import { UserRole } from 'nestjs-app-utils'

export const Roles = Reflector.createDecorator<UserRole[]>()
