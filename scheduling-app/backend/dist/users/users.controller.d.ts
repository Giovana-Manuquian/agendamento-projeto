import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
