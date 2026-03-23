import { PrismaService } from '../prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateAppointmentDto): Promise<{
        id: string;
        clientName: string;
        clientEmail: string;
        date: Date;
        status: string;
        serviceId: string;
    }>;
    findAll(): Promise<({
        service: {
            id: string;
            name: string;
            description: string | null;
            price: number;
            duration: number;
            userId: string;
        };
    } & {
        id: string;
        clientName: string;
        clientEmail: string;
        date: Date;
        status: string;
        serviceId: string;
    })[]>;
    findOne(id: string): Promise<{
        service: {
            id: string;
            name: string;
            description: string | null;
            price: number;
            duration: number;
            userId: string;
        };
    } & {
        id: string;
        clientName: string;
        clientEmail: string;
        date: Date;
        status: string;
        serviceId: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        clientName: string;
        clientEmail: string;
        date: Date;
        status: string;
        serviceId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        clientName: string;
        clientEmail: string;
        date: Date;
        status: string;
        serviceId: string;
    }>;
}
