import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

// project imports
import { AppModule } from './app.module'
import { RpcExceptionToHttpExceptionFilter } from './filters/RpcExceptionToHttpException.filter'
import { RpcExceptionInterceptor } from './interceptors/RpcException.interceptor'

async function runServer() {
  const app = await NestFactory.create(AppModule)
  const PORT = process.env.GATEWAY_PORT || 3030

  // Глобальный перехватчик и фильтр ошибок (исключений) из микросервисов
  app.useGlobalInterceptors(new RpcExceptionInterceptor())
  app.useGlobalFilters(new RpcExceptionToHttpExceptionFilter())

  // Подключаем Swagger по пути /doc
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS microservices')
    .setDescription('Проект на NestJS с микросервисами')
    .setVersion('1.0')
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('doc', app, swaggerDocument)

  await app.listen(PORT)
}

runServer()
