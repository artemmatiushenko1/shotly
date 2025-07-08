import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfigService } from './app-config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(AppConfigService).appConfig;

  await app.listen(appConfig.port);

  console.info(`Server is running on ${await app.getUrl()}`);
}

bootstrap();
