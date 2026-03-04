import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service'; // Importando a ponte que você acabou de criar

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService], // Adicione o PrismaService aqui
})
export class UsersModule {}