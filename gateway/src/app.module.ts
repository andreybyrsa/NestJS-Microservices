import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule, JwtService, JwtModuleOptions } from '@nestjs/jwt'

// project modules
import { NestClientModule } from './nestClient/nestClient.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { JWTMidlleware } from './middlewares/jwt.middleware'

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
  ],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMidlleware).exclude('api/auth/(.*)').forRoutes('*')
  }
}