import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [AppConfigModule, DatabaseModule],
})
export class AppModule {}
