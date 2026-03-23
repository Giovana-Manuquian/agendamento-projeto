export class CreateAppointmentDto {
  clientName: string;
  clientEmail: string;
  date: string; // Recebemos como string (ISO 8601) e convertemos depois
  serviceId: string;
}