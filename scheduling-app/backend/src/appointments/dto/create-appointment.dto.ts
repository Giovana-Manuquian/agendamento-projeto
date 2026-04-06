import { IsEmail, IsISO8601, IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  @Length(2, 80, { message: 'Nome deve ter entre 2 e 80 caracteres.' })
  clientName: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  clientEmail: string;

  @IsISO8601({}, { message: 'Data/hora inválida.' })
  date: string; // Recebemos como string (ISO 8601) e convertemos depois

  @IsUUID(undefined, { message: 'Serviço inválido.' })
  serviceId: string;
}