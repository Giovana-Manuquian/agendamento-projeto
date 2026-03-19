import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [UsersModule, ServicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}