import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<{
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
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<{
        id: string;
        clientName: string;
        clientEmail: string;
        date: Date;
        serviceId: string;
        status: string;
    }>;
    updateStatus(id: string, status: string): Promise<{
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
