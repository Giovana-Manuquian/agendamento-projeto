// src/services/dto/create-service.dto.ts
export class CreateServiceDto {
  name: string;
  description?: string;
  price: number;
  duration: number;
  userId: string;
}