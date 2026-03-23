import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PrismaService } from '../prisma.service'; // Importe o seu PrismaService

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, PrismaService], // Adicione o PrismaService aqui
})
export class AppointmentsModule {}