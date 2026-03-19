import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Certifique-se que o caminho está correto
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  // 1. Injetamos o Prisma para acessar o banco
  constructor(private prisma: PrismaService) {}

async create(data: CreateServiceDto) {
  return this.prisma.service.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      duration: data.duration, // Certifique-se de que duration está no seu DTO
      user: {
        connect: { id: data.userId } // Conecta ao usuário pelo ID
      },
    },
  });
}

  async findAll() {
    // Retorna todos os serviços e inclui os dados do profissional (user)
    return this.prisma.service.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: string) {
    // No seu schema o ID é String (UUID), então mudamos de number para string
    return this.prisma.service.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async update(id: string, data: UpdateServiceDto) {
    return this.prisma.service.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.service.delete({
      where: { id },
    });
  }
}