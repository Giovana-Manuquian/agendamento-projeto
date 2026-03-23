import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAppointmentDto) {
    const appointmentDate = new Date(data.date);
    
    // 1. Buscar detalhes do serviço para saber a duração
    const service = await this.prisma.service.findUnique({
      where: { id: data.serviceId },
    });

    if (!service) {
      throw new BadRequestException('Serviço não encontrado.');
    }

    // 2. Calcular o horário de término do novo agendamento
    const endTime = new Date(appointmentDate.getTime() + service.duration * 60000);

    // 3. Validação: Verificar se já existe agendamento que sobreponha este horário
    // Regra: (Início1 < Término2) E (Término1 > Início2)
    const conflict = await this.prisma.appointment.findFirst({
      where: {
        serviceId: data.serviceId,
        AND: [
          { date: { lt: endTime } }, // Começa antes do novo terminar
          { 
            // Precisamos garantir que ele termina depois do novo começar.
            // Como não salvamos o endTime no banco, verificamos a data de início.
            date: { gt: new Date(appointmentDate.getTime() - (service.duration * 60000)) } 
          }
        ]
      }
    });

    if (conflict) {
      throw new BadRequestException('Este horário já está ocupado para este serviço.');
    }

    // 4. Criar o agendamento se não houver conflito
    return this.prisma.appointment.create({
      data: {
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        date: appointmentDate,
        service: { connect: { id: data.serviceId } },
        status: "PENDING" // Valor padrão definido no schema
      },
    });
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      include: { service: true }
    });
  }

  // Busca um agendamento específico
  async findOne(id: string) {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: { service: true }
    });
  }

  // Atualiza um agendamento (ex: mudar status ou data)
  async update(id: string, data: any) { // Você pode criar um UpdateAppointmentDto depois
    return this.prisma.appointment.update({
      where: { id },
      data,
    });
  }

  // Remove um agendamento
  async remove(id: string) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}