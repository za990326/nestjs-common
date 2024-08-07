import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ResultInterceptor } from './interceptor/result.interceptor';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { AnyExceptionFilter } from './filters/error.filter';
// import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 异常过滤器
  app.useGlobalFilters(new AnyExceptionFilter());
  // 拦截器
  app.useGlobalInterceptors(new ResultInterceptor(), new LoggingInterceptor());
  // 管道类型检测
  // app.useGlobalPipes(new ValidationPipe());
  // 静态文件
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/xiaoao',
  });
  // 路由版本控制
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  // session
  app.use(
    session({
      secret: 'keyboard cat',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );
  // 跨域
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
