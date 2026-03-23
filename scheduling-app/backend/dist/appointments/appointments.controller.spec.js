"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const appointments_controller_1 = require("./appointments.controller");
const appointments_service_1 = require("./appointments.service");
describe('AppointmentsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [appointments_controller_1.AppointmentsController],
            providers: [appointments_service_1.AppointmentsService],
        }).compile();
        controller = module.get(appointments_controller_1.AppointmentsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=appointments.controller.spec.js.map