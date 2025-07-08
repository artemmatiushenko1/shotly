import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';
import loadDatabaseConfig from '../database/database.config';
import loadAppConfig from '../app/app.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [loadAppConfig, loadDatabaseConfig],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
