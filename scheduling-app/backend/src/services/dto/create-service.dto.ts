// src/services/dto/create-service.dto.ts
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from 'class-validator';

export class CreateServiceDto {
  @IsString({ message: 'Nome do serviço inválido.' })
  @IsNotEmpty({ message: 'Nome do serviço é obrigatório.' })
  @Length(2, 80, { message: 'Nome do serviço deve ter entre 2 e 80 caracteres.' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Descrição inválida.' })
  description?: string;

  @IsNumber({}, { message: 'Preço inválido.' })
  @Min(0, { message: 'Preço deve ser maior ou igual a 0.' })
  price: number;

  @IsInt({ message: 'Duração inválida.' })
  @Min(1, { message: 'Duração deve ser em minutos (>= 1).' })
  duration: number;

  @IsUUID(undefined, { message: 'Profissional (userId) inválido.' })
  userId: string;
}