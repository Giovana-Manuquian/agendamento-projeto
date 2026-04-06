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
        serviceId: string;
        status: string;
    }>;
    findAll(serviceId?: string): Promise<({
        service: {
            user: {
                id: string;
                email: string;
                name: string;
                password: string;
                specialty: string;
                createdAt: Date;
            };
        } & {
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
        serviceId: string;
        status: string;
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
        serviceId: string;
        status: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        clientName: string;
        clientEmail: string;
        date: Date;
        serviceId: string;
        status: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        clientName: string;
        clientEmail: string;
        date: Date;
        serviceId: string;
        status: string;
    }>;
}
