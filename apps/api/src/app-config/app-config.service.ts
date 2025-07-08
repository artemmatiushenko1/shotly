import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/app/app.config';
import { DatabaseConfig } from 'src/database/database.config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get databaseConfig(): DatabaseConfig {
    return this.configService.getOrThrow('database');
  }

  get appConfig(): AppConfig {
    return this.configService.getOrThrow('app');
  }
}
