import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule, JwtService, JwtModuleOptions } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core/constants'

// project imports
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { JWTMidlleware } from './middlewares/jwt.middleware'
import { CommentsModule } from './modules/comments/comments.module'
import { RolesGuard } from './guards/roles.guard'

// utils from package
import { NestClientModule } from 'nestjs-app-utils'

// Конфигурация JWT модуля
const jwtModuleOptions: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
}

@Module({
  imports: [
    NestClientModule,
    JwtModule.register(jwtModuleOptions),
    AuthModule,
    UsersModule,
    CommentsModule,
  ],
  providers: [
    JwtService,
    {
      // Добавляем RolesGuard, чтобы можно было использовать над любым роутом
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Убираем обработку роутов api/auth/* JWT мидлваром
    consumer.apply(JWTMidlleware).exclude('api/auth/(.*)').forRoutes('*')
  }
}
