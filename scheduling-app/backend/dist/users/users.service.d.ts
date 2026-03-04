import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        specialty: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        specialty: string;
        createdAt: Date;
    }[]>;
}
