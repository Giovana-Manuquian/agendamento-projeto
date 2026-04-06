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
exports.CreateAppointmentDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAppointmentDto {
}
exports.CreateAppointmentDto = CreateAppointmentDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório.' }),
    (0, class_validator_1.Length)(2, 80, { message: 'Nome deve ter entre 2 e 80 caracteres.' }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "clientName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'E-mail inválido.' }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "clientEmail", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)({}, { message: 'Data/hora inválida.' }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(undefined, { message: 'Serviço inválido.' }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "serviceId", void 0);
//# sourceMappingURL=create-appointment.dto.js.map