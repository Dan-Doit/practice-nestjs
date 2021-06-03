import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // dto 이외의 정보가 들어오면 접근할수 없게한다.
      forbidNonWhitelisted: true,
      // 들어온 값을 Pram의 속성으로 변환을 해준다.
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
