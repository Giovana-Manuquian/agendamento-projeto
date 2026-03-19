import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        specialty: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        specialty: string;
        createdAt: Date;
    }[]>;
}
