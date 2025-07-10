import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, AuthModule],
})
export class AppModule {}
