import { PrismaService } from '../prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateServiceDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        duration: number;
        userId: string;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
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
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
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
    }>;
    update(id: string, data: UpdateServiceDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        duration: number;
        userId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        duration: number;
        userId: string;
    }>;
}
