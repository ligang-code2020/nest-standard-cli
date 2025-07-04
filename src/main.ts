import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { CatchEverythingFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CatchEverythingFilter()); // 全局捕获所有错误
  app.useGlobalInterceptors(new ResponseInterceptor()); // 全局处理正常返回

  await app.listen(3000);
}
bootstrap();
