import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [UsersModule, ServicesModule, AppointmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}