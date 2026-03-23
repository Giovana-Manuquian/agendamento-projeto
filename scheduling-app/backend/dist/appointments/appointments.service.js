"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let AppointmentsService = class AppointmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const appointmentDate = new Date(data.date);
        const service = await this.prisma.service.findUnique({
            where: { id: data.serviceId },
        });
        if (!service) {
            throw new common_1.BadRequestException('Serviço não encontrado.');
        }
        const endTime = new Date(appointmentDate.getTime() + service.duration * 60000);
        const conflict = await this.prisma.appointment.findFirst({
            where: {
                serviceId: data.serviceId,
                AND: [
                    { date: { lt: endTime } },
                    {
                        date: { gt: new Date(appointmentDate.getTime() - (service.duration * 60000)) }
                    }
                ]
            }
        });
        if (conflict) {
            throw new common_1.BadRequestException('Este horário já está ocupado para este serviço.');
        }
        return this.prisma.appointment.create({
            data: {
                clientName: data.clientName,
                clientEmail: data.clientEmail,
                date: appointmentDate,
                service: { connect: { id: data.serviceId } },
                status: "PENDING"
            },
        });
    }
    async findAll() {
        return this.prisma.appointment.findMany({
            include: { service: true }
        });
    }
    async findOne(id) {
        return this.prisma.appointment.findUnique({
            where: { id },
            include: { service: true }
        });
    }
    async update(id, data) {
        return this.prisma.appointment.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.appointment.delete({
            where: { id },
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map